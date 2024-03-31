
import Order from "@/lib/models/order";
import Product from "@/lib/models/products";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const {userId}=auth()
    await connectToDB();

    const orders = await Order.find({
      customerClerkId: userId,
    }).populate({ path: "products.product", model: Product });

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.log("[customerId_GET", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";