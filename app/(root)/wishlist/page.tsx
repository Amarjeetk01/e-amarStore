"use client";

import ProductCard from "@/components/ProductCard";
import Loader from "@/components/custom-ui/Loader";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await res.json();
      return userData;
    } catch (error) {
      console.error("[users_GET]", error);
      throw error;
    }
  };

  const fetchProductDetails = async (productId: string) => {
    try {
      const res = await fetch(`/api/products/${productId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch product details");
      }
      return await res.json();
    } catch (error) {
      console.error("[productsId_GET]", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const userData = await fetchUserData();
        const wishlistProducts = await Promise.all(
          userData?.wishlist.map(async (productId: string) => {
            try {
              return await fetchProductDetails(productId);
            } catch (error) {
              console.error("Error fetching product:", error);
              return null;
            }
          }) ?? []
        );
        setWishlist(wishlistProducts.filter(Boolean));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {loading ? (
        <Loader />
      ) : wishlist.length === 0 ? (
        <p>No items in your wishlist</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Wishlist;
