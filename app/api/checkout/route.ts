import Cart from "@/lib/models/cart";
import Product from "@/lib/models/products";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export const PUT = async (req: NextRequest) => {
  try {
    const { customer } = await req.json();
    if(!customer){
        return new NextResponse("Not enough data to checkout", { status: 400 });
    }
    const carts = await Cart.find({ clerkId: customer.clerkId })
      .populate({ path: "product", model: Product })
      .select("-updatedAt -__v");
    if (!customer || !carts) {
      return new NextResponse("Not enough data to checkout", { status: 400 });
    }
    const token = uuidv4();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        { shipping_rate: "shr_1OzNeISIp6Rd7vINRsnJGY2z" },
        { shipping_rate: "shr_1OzNfDSIp6Rd7vINjS86nIaP" },
      ],
      line_items: carts.map((cartItem: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: cartItem.product.title,
            metadata: {
              productId: cartItem.product._id.toString(),
              ...(cartItem.size.toString() && { size: cartItem.size.toString() }),
              ...(cartItem.color.toString() && { color: cartItem.color.toString() }),
            },
          },
          unit_amount: cartItem.product.expense * 100,
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: customer.clerkId,
      success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success?token=${token}`,
      cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`,
      metadata:{
        paymentToken: token,
      },

    });

    return NextResponse.json(session, { headers: corsHeaders });
  } catch (err) {
    console.log("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
