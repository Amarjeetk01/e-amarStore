"use client";

import { useState } from "react";
import HeartFavorite from "./HeartFavorite";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import useFetchCart from "@/lib/hook/useFetchQuantity";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const router = useRouter();
  const { user } = useUser();
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isCart, setIsCart] = useState(false);
  const { checkIsCart } = useFetchCart();

  const handleCart = async () => {
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        const isCart = await checkIsCart(productInfo._id);
        if (isCart) {
          return toast("Item already in cart", {
            icon: "🛒",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
        await fetch("/api/carts", {
          method: "POST",
          body: JSON.stringify({
            productId: productInfo._id,
            quantity,
            color: selectedColor,
            size: selectedSize,
          }),
        });
        setIsCart(true);
        toast.success("Item added to cart");
      }
    } catch (err) {
      console.log("[whilsit_POST]", err);
    }
  };

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}</p>
        <HeartFavorite product={productInfo} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-2">Category:</p>
        <p className="text-base-bold">{productInfo.category}</p>
      </div>
      <p className="flex flex-nowrap gap-1">
        $
        <span className="line-through text-sm opacity-80">
          {productInfo.price}
        </span>
        <span className="text-heading3-bold">{productInfo.expense}</span>
      </p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Description:</p>
        <p className="text-small-medium">{productInfo.description}</p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Colors:</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedColor === color && "bg-black text-white"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Sizes:</p>
          <div className="flex gap-2">
            {productInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedSize === size && "bg-black text-white"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <button
        className="outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white"
        onClick={handleCart}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;
