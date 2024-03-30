'use client'
import { useEffect, useState } from "react";

type CustomUserType = {
  clerkId: string;
  role: string;
  wishlist: [string];
  createdAt: string;
};

export const useFetchUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<CustomUserType | null>(null);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "GET",
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log("[users_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUser();
  }, []);

  return { user, loading };
};
