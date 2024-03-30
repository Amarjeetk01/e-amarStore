"use client";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

const SearchProducts = ({ params }: { params: { query: string } }) => {
  const [searchedProducts, setSearchedProducts] = useState<any>(null);
  const decodedQuery = decodeURIComponent(params.query);

  const getSearchProducts = async () => {
    try {
      const res = await fetch(`/api/search/${params.query}`);
      if (!res.ok) {
        throw new Error("Not found");
      }
      const data = await res.json();
      setSearchedProducts(data);
    } catch (err) {
      console.log("[searchproduct_GET]", err);
    }
  };

  useEffect(() => {
    getSearchProducts();
  }, [params.query]);

  return (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Search results for {decodedQuery}</p>
      {!searchedProducts || searchedProducts.length === 0 ? (
        <p className="text-body-bold my-5">No result found</p>
      ) : (
        <div className="flex flex-wrap justify-between gap-16">
          {searchedProducts.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export const dynamic = "force-dynamic";
export default SearchProducts;
