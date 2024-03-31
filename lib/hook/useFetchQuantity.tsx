"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const useFetchCart = () => {
  const { user } = useUser();
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState<any[]>([]);
  const getCart = async () => {
    try {
      if (!user) {
        toast.error("Unauthorized!");
      } else {
        const res = await fetch("/api/carts", {
          method: "GET",
        });
        if(res.ok){
          const data = await res.json();
        setCarts(data);
        setQuantity(data.length);
        }
      }
    } catch (err) {
      console.error("Error fetching cart data:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (id: string, quantity: number) => {
    try {
      if (!user) {
        toast.error("Unauthorized!");
      } else {
        const res = await fetch("/api/carts", {
          method: "POST",
          body: JSON.stringify({ productId: id, quantity }),
        });
        if (res.ok) {
          const updatedCarts = carts.map((cartItem) =>
            cartItem.product._id === id ? { ...cartItem, quantity } : cartItem
          );
          setCarts(updatedCarts);
        } else {
          toast.error("Failed to update cart item quantity");
          throw new Error("Failed to update cart item quantity");
        }
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Error updating cart item quantity:", err);
    }
  };

  const removeCartItem = async (id: string) => {
    try {
      if (!user) {
        toast.error("Unauthorized!");
      } else {
        const res = await fetch("/api/carts", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
        });
        if (res.ok) {
          const updatedCarts = carts.filter(
            (cartItem) => cartItem.product._id !== id
          );
          setCarts(updatedCarts);
          setQuantity(updatedCarts.length);
          toast.success("Item succefully removed!");
        } else {
          toast.error("Failed to delete cart item");
          throw new Error("Failed to delete cart item");
        }
      }
    } catch (err) {
      console.error("[cart_DELETE]", err);
      toast.error("Something went wrong");
    }
  };

  const checkIsCart = async (id: string) => {
    if (!user) {
      toast.error("Unauthorized!");
      return false;
    }
    await getCart();
    if (carts.length === 0) {
      setQuantity((cartQuantity) => cartQuantity + 1);
      return false;
    }

    const isCart = carts.some((cartItem) => cartItem.product._id === id);
    if (!isCart && quantity > 0) {
      setQuantity((cartQuantity) => cartQuantity + 1);
      return false;
    }
    return isCart;
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);
  return {
    quantity,
    loading,
    carts,
    updateCartItemQuantity,
    removeCartItem,
    checkIsCart,
    getCart,
  };
};

export default useFetchCart;
