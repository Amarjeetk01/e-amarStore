import Cart from "@/lib/models/cart";
import Customer from "@/lib/models/customer";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { token } = await req.json();
    if (!token) {
      return new NextResponse("Token is required", { status: 400 });
    }
    const customer = await Customer.findOne({ paymentToken: token });

    if (!customer) {
      return new NextResponse("Invalid token", { status: 403 });
    }
    customer.paymentToken = null;
    await customer.save();
    await Cart.deleteMany({ clerkId: userId });
    return new NextResponse("Payment successful.", {
      status: 200,
    });
  } catch (err) {
    console.error("[paymentSuccess]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
