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
import ImageZoom from "./ImazeZoom";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <div className="w-96 h-96 rounded-lg shadow-xl object-cover">
        <ImageZoom imgSrc={mainImage} />
      </div>
      {/* <Image
        src={mainImage}
        width={500}
        height={500}
        alt="product"
        className="w-96 h-96 rounded-lg shadow-xl object-cover"
      /> */}
      <div>
      <Carousel
      className="max-w-[500px]"
      opts={{
        align: 'start',
      }}
    >
      <CarouselContent className="-ml-1">
        {productMedia.map((image, index) => (
          <CarouselItem key={index} className="basis-1/4 overflow-hidden rounded-lg">
            <Image
              src={image}
              height={200}
              width={200}
              alt="product"
              className={`w-20 h-20 rounded-lg object-cover cursor-pointer transition-transform duration-300 ${
                    mainImage === image ? "border-2 border-gray-800" : ""
                  } ${
                hoveredImage === index ? 'scale-110 ' : ''
              }`}
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => setMainImage(image)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      {isHovered && (
        <div className="absolute z-50 border-4 rounded-full pointer-events-none border-gray-500">
          <Image
            src={mainImage}
            width={200 * 2.5} // Assuming ZOOM_LEVEL = 2.5
            height={200 * 2.5} // Assuming ZOOM_LEVEL = 2.5
            className="object-cover"
            alt="zoomed-product"
          />
        </div>
      )}
    </Carousel>
      </div>
    </div>
  );
};

export default Gallery;
