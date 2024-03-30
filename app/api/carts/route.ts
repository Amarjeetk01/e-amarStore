import Cart from "@/lib/models/cart";
import Product from "@/lib/models/products";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

interface ICart {
  _id: string;
  clerkId: string;
  product: string;
  quantity: number;
  color?: string;
  size?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const { productId, quantity, color, size } = await req.json();
    let existingCart: ICart | null = await Cart.findOne({
      clerkId: userId,
      product: productId,
    });

    if (existingCart) {
      const updatedCart = await Cart.findOneAndUpdate(
        { _id: existingCart._id },
        { $set: { quantity } },
        { new: true }
      );
      return NextResponse.json(updatedCart, { status: 200 });
    } else {
      const cart = new Cart({
        clerkId: userId,
        product: productId,
        quantity,
        color,
        size,
      });
      const newCart = await cart.save();
      return NextResponse.json(newCart, { status: 200 });
    }
  } catch (err) {
    console.log("[cart_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const carts = await Cart.find({ clerkId: userId })
      .populate({ path: "product", model: Product })
      .select("-updatedAt -__v");
    return NextResponse.json(carts, { status: 200 });
  } catch (err) {
    console.log("[cart_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
export const DELETE = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { productId } = await req.json();
    await Cart.findOneAndDelete({ clerkId: userId, product: productId });
    const updatedCarts = await Cart.find({ clerkId: userId })
      .populate({ path: "product", model: Product })
      .select("-updatedAt -__v");
    return NextResponse.json(updatedCarts, { status: 200 });
  } catch (err) {
    console.log("[cart_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
