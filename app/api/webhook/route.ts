import { metadata } from "@/app/(auth)/layout";
import Order from "@/lib/models/order";
import Customer from "@/lib/models/customer";

import { connectToDB } from "@/lib/mongoDB";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export const POST = async (req: NextRequest) => {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const customerInfo = {
        clerkId: session?.client_reference_id,
        name: session?.customer_details?.name,
        email: session?.customer_details?.email,
      };
      
      const paymentToken=session?.metadata?.paymentToken
      const shippingAddress = {
        street: session?.shipping_details?.address?.line1,
        city: session?.shipping_details?.address?.city,
        state: session?.shipping_details?.address?.state,
        postalCode: session?.shipping_details?.address?.postal_code,
        country: session?.shipping_details?.address?.country,
      };

      const retrieveSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items.data.price.product"] }
      );

      const lineItems = await retrieveSession?.line_items?.data;
      const orderItems = lineItems?.map((item: any) => {
        return {
          product: item.price.product.metadata.productId,
          color: item.price.product.metadata.color || "N/A",
          size: item.price.product.metadata.size || "N/A",
          quantity: item.quantity,
        };
      });
      
     
      await connectToDB();

      const newOrder = new Order({
        customerClerkId: customerInfo.clerkId,
        products: orderItems,
        shippingAddress,
        shippingRate: session?.shipping_cost?.shipping_rate,
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
      });

      await newOrder.save();

      let customer = await Customer.findOne({ clerkId: customerInfo.clerkId });

      if (customer) {
        customer.orders.push(newOrder._id);
        await Customer.findByIdAndUpdate(customer._id, { paymentToken: paymentToken });
      } else {
        customer = new Customer({
          ...customerInfo,
          orders: [newOrder._id],
          paymentToken:paymentToken
        });
      }

      await customer.save();
    }

    return new NextResponse("Order created", { status: 200 });
  } catch (err) {
    console.log("[webhooks_POST]", err);
    return new NextResponse("Failed to create the order", { status: 500 });
  }
};
