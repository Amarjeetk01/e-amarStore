import Customer from "@/lib/models/customer";
import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectToDB();

    const orders = await Order.find().sort({createdAt:"desc"});
    const orderDetails=await Promise.all(orders.map(async (order)=>{
        const customer=await Customer.findOne({clerkId:order.customerClerkId})
        return{
            _id:order._id,
            customer:customer.name,
            products:order.products.length,
            totalAmount:order.totalAmount,
            createdAt:format(order.createdAt,"MMM do, yyy")
        }
    }))
    return NextResponse.json(orderDetails, { status: 200 });
  } catch (err) {
    console.log("[orders_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};