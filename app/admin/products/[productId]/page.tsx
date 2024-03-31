"use client";

import Loader from "@/components/custom-ui/Loader";
import ProductForm from "@/components/products/ProductForm";
import { useEffect, useState } from "react";

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );


  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await fetch(`/api/products/${params.productId}`, {
          method: "GET",
        });
        if(!res.ok){
          throw new Error("Failed to fetch product data");
        }
        const data = await res.json();
        setProductDetails(data);
        setLoading(false);
      } catch (err) {
        console.log("[productId_GET]", err);
      }finally{
        setLoading(false)
      }
    };
    getProductDetails();
  }, [params.productId]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <ProductForm initialData={productDetails} />
    </>
  );
};

export default ProductDetail;
