"use client"
import ProductForm from "@/components/products/ProductForm";
import { useFetchUser } from "@/lib/hook/useFetchUser";
import { Loader } from "lucide-react";
import {  useState } from "react";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useFetchUser();

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
