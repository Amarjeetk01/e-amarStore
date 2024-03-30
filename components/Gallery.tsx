"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [isLeftMost, setLeftMost] = useState(true);
  const [isRightMost, setRightMost] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the container has overflow, if so, show the scroll buttons
    if (containerRef.current) {
      const container = containerRef.current;
      if (container.scrollWidth > container.clientWidth) {
        // Overflow detected, you can show the scroll buttons
        
        setShowScrollButtons(true);
      } else {
        setShowScrollButtons(false);
      }
    }
  }, [productMedia]);

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      if (scrollLeft === 0) {
        setLeftMost(true);
      } else if (scrollLeft + clientWidth >= scrollWidth) {
        setRightMost(true);
      } else {
        setLeftMost(false);
        setRightMost(false);
      }
    }
  };

  const handleLeft = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTo({
        left: container.scrollLeft - 100,
        behavior: "smooth",
      });
    }
  };

  const handleRight = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTo({
        left: container.scrollLeft + 100,
        behavior: "smooth",
      });
    }
  };

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
        <div
          className="flex gap-2 overflow-x-auto no-scrollbar"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {productMedia.map((image, index) => (
            <Image
              key={index}
              src={image}
              height={200}
              width={200}
              alt="product"
              className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${
                mainImage === image ? "border-2 border-black" : ""
              }`}
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
        {showScrollButtons && (
          <div className="relative flex items-center">
            <button
              className={`absolute -left-5 bottom-6 bg-blue-300 text-lg p-1 rounded-full shadow-xl hover:bg-black hover:text-white ${isLeftMost ? 'hidden' : ''}`}
              onClick={handleLeft}
            >
              <ChevronLeft />
            </button>

            <button
              className={`absolute right-0 bottom-6 bg-blue-300 text-lg p-1 rounded-full shadow-xl hover:bg-black hover:text-white ${isRightMost ? 'hidden' : ''}`}
              onClick={handleRight}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
