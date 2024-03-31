"use client";
import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo";
import Loader from "@/components/custom-ui/Loader";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetails = ({
  params,
}: {
  params: { productId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<{
    details: any | null;
    related: ProductType[] | null;
  }>({
    details: null,
    related: null,
  });

  const { details, related } = productData;

  const fetchData = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return await res.json();
    } catch (error) {
      console.log("[Fetch Error]", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const [productDetails, relatedProducts] = await Promise.all([
          fetchData(`/api/products/${params.productId}`),
          fetchData(`/api/products/${params.productId}/related`),
        ]);
        setProductData({ details: productDetails, related: relatedProducts });
      } catch (error) {
        console.log("[productDetail]", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, [params.productId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
            <Gallery productMedia={details.media} />
            <ProductInfo productInfo={details} />
          </div>
          {related && (
            <div className="flex flex-col px-10 py-5 max-md:px-3">
              <p className="text-heading3-bold">Related Products</p>
              <div className="px-10">
              <Carousel
                opts={{
                  align: "start",
                }}
                
              >
                <CarouselContent className="mt-8">
                  {related.map((product: ProductType) => (
                    <CarouselItem
                      key={product._id}
                      className="pl-1 sm:basis-2/4 md:basis-1/3 lg:basis-1/4"
                    >
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export const dynamic = "force-dynamic";

export default ProductDetails;
