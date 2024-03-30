import React, { MouseEvent, useState } from 'react';
import Image from 'next/image';

// Constants for magnifier size and zoom level
const MAGNIFIER_SIZE: number = 100;
const ZOOM_LEVEL: number = 2.5;

// ImageZoom component
interface ImageZoomProps {
  imgSrc: string;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ imgSrc }) => {
  // State variables
  const [zoomable, setZoomable] = useState<boolean>(false);
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [position, setPosition] = useState<{ x: number; y: number; mouseX: number; mouseY: number }>({
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
  });

  // Event handlers
  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>): void => {
    let element = e.currentTarget;
    let { width, height } = element.getBoundingClientRect();
    setImageSize({ width, height });
    setZoomable(true);
    updatePosition(e);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>): void => {
    setZoomable(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    updatePosition(e);
  };

  const updatePosition = (e: MouseEvent<HTMLDivElement>): void => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - left;
    let y = e.clientY - top;
    setPosition({
      x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      mouseX: x - MAGNIFIER_SIZE / 2,
      mouseY: y - MAGNIFIER_SIZE / 2,
    });
  };

  // Render method
  return (
    <div className='flex justify-center items-center'>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className='w-80 h-96 relative overflow-hidden'
      >
        <Image className='object-cover border z-10' alt='' src={imgSrc} width={imageSize.width} height={imageSize.height} />
        <div
          style={{
            backgroundPosition: `${position.x}px ${position.y}px`,
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${imageSize.height * ZOOM_LEVEL}px`,
            backgroundRepeat: 'no-repeat',
            display: zoomable ? 'block' : 'none',
            top: `${position.mouseY}px`,
            left: `${position.mouseX}px`,
            width: `${MAGNIFIER_SIZE}px`,
            height: `${MAGNIFIER_SIZE}px`,
          }}
          className={`z-50 border-4 rounded-full pointer-events-none absolute border-gray-500`}
        ></div>
      </div>
    </div>
  );
};

export default ImageZoom;
