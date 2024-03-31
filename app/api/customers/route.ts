import Customer from "@/lib/models/customer";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectToDB();

    const customers = await Customer.find().sort({createdAt:"desc"});
    
    return NextResponse.json(customers, { status: 200 });
  } catch (err) {
    console.log("[customers_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};