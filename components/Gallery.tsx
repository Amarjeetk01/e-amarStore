"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <Image
        src={mainImage}
        width={500}
        height={500}
        alt="product"
        className="w-96 h-96 rounded-lg shadow-xl object-cover"
      />
      <div>
        <Carousel
          className="max-w-[500px]"
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="-ml-1">
            {productMedia.map((image, index) => (
              <CarouselItem key={index} className="basis-1/4 ">
                <Image
                  src={image}
                  height={200}
                  width={200}
                  alt="product"
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${
                    mainImage === image ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setMainImage(image)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Gallery;
