'use client'
import { useEffect, useState } from "react";

type CustomUserType = {
  clerkId: string;
  role: string;
};

const useFetchUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<CustomUserType | null>(null);

  const getUser = async () => {
    setLoading(true); 
    try {
      const res = await fetch("/api/users", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("[users_GET]", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return {
    loading,
    user,
    getUser,
  };
};

export default useFetchUser;
