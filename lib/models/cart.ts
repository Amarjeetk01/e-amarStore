import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      // unique: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      // unique: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
