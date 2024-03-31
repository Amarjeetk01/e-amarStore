"use client";
import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const getUser = async () => {
    try {
      await fetch("/api/users");
    } catch (err) {
      console.log("[users_GET]", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);
  return (
    <div>
      <div className="h-[90vh] w-auto object-contain relative">
        <Image src={`/banner.jpeg`} alt="banner" fill />
      </div>
      <div>
        <Collections />
        <ProductList />
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic"