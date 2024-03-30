import Customer from "@/lib/models/customer";
import Order from "@/lib/models/order";
import Product from "@/lib/models/products";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  try {
    await connectToDB();
    const orderDetails = await Order.findById(params.orderId)
      .sort({ createdAt: "desc" })
      .populate({ path: "products.product", model: Product })
      .select(" -__v");
    if (!orderDetails) {
      return new NextResponse(
        JSON.stringify({ message: "OrderDetails not found" }),
        { status: 404 }
      );
    }
    const customer = await Customer.findOne({
      clearkId: orderDetails.customerClerkId,
    });
    return NextResponse.json({ orderDetails, customer }, { status: 200 });
  } catch (err) {
    console.log("[orderId_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
