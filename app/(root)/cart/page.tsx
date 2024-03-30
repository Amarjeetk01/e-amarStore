"use client";

import Loader from "@/components/custom-ui/Loader";
import useFetchCart from "@/lib/hook/useFetchQuantity";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const { loading, carts,updateCartItemQuantity,removeCartItem,getCart }=useFetchCart()
  const handleQuantiyIncrease = async (id: string, quantity: number) => {
    try {
      await updateCartItemQuantity(id, quantity + 1);
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  const handleQuantityDecrease = async (id: string, quantity: number) => {
    try {
      if (quantity > 1) {
        await updateCartItemQuantity(id, quantity - 1);
      }
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      if (!user) {
        router.push("/sign-in");
      } else {
        await removeCartItem(id)
      }
    } catch (err) {
      console.error("[cart_DELETE]", err);
    }
  };

  const total = carts?.reduce(
    (acc: number, cartItem: any) =>
      acc + cartItem.product?.expense * cartItem.quantity,
    0
  );

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0]?.emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("/sign-in");
      } else if (carts.length === 0) {
        toast.error("First add items to the cart!");
      } else {
        const res = await fetch("/api/checkout", {
          method: "PUT",
          body: JSON.stringify({ customer }),
        });
        if (res.ok) {
          const paymentSession = await res.json();
          window.location.href = paymentSession.url;
        } else {
          throw new Error("Failed to initiate payment.");
        }
      }
    } catch (err) {
      console.log("[handleCheckout]", err);
      toast.error(
        "Payment failed. Please check your information and try again."
      );
    }
  };

  useEffect(() => {
    if (user) {
      getCart();
      
    }
  }, [user]);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      {/* Cart Items Section */}
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {!carts.length ? (
          <p className="text-body-bold">No items in the cart</p>
        ) : (
          <div>
            {carts &&
              carts.map((cartItem: any) => (
                <div key={cartItem._id}>
                  {cartItem.product && (
                    <div className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between">
                      <div className="flex items-center">
                        <Image
                          src={cartItem.product.media[0]}
                          width={100}
                          height={100}
                          className="rounded-lg w-32 h-32 object-cover"
                          alt="product"
                        />
                        <div className="flex flex-col gap-3 ml-4">
                          <p className="text-body-bold">
                            {cartItem.product.title}
                          </p>
                          {cartItem.color && (
                            <p className="text-small-medium">
                              {cartItem.color}
                            </p>
                          )}
                          {cartItem.size && (
                            <p className="text-small-medium">{cartItem.size}</p>
                          )}
                          <p className=" flex flex-nowrap gap-2">
                            <span className="line-through text-sm opacity-80">
                              ${cartItem.product.price}
                            </span>{" "}
                            <span className="text-base font-bold">
                              ${cartItem.product.expense}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-center">
                        <MinusCircle
                          className="hover:text-red-1 cursor-pointer"
                          onClick={() =>
                            handleQuantityDecrease(
                              cartItem.product._id,
                              cartItem.quantity
                            )
                          }
                        />
                        <p className="text-body-bold">{cartItem.quantity}</p>
                        <PlusCircle
                          className="hover:text-red-1 cursor-pointer"
                          onClick={() =>
                            handleQuantiyIncrease(
                              cartItem.product._id,
                              cartItem.quantity
                            )
                          }
                        />
                      </div>

                      <Trash
                        className="hover:text-red-1 cursor-pointer"
                        onClick={() => handleRemove(cartItem.product._id)}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>
            ({carts.length} {carts.length > 1 ? "items" : "item"})
          </span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
          <span>$ {parseFloat(total.toFixed(2))}</span>
        </div>
        <button
          className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
