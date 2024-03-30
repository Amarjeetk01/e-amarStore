"use client"
import ProductForm from "@/components/products/ProductForm";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type CustomUserType = {
  clerkId: string;
  role: string;
};


const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<CustomUserType | null>(null);

  const getUser = async () => {
    try {
      const res = await fetch('/api/users', {
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
    getUser();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      {user && user.role !== 'admin' ? (
        <>
           {toast.error("You are not authorized to delete or update.")}
        </>
      ) : (
      <ProductForm />
      )}
    </div>
  );
};

export default CreateProduct;
