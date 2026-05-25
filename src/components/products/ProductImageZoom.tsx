"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/constants";
import { cn } from "@/lib/cn";

type ProductImageZoomProps = {
  src: string;
  alt: string;
  zoomFactor?: number;
  className?: string;
  onClick?: () => void;
};

export function ProductImageZoom({
  src,
  alt,
  zoomFactor = 2.5,
  className,
  onClick,
}: ProductImageZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [failed, setFailed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const imageSrc = failed ? PRODUCT_PLACEHOLDER_IMAGE : src;

  // Update container size on mouse enter
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setContainerSize({ width: rect.width, height: rect.height });
    setIsHovered(true);
    
    // Set initial mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Lens calculations
  const lensWidth = containerSize.width ? containerSize.width / zoomFactor : 0;
  const lensHeight = containerSize.height ? containerSize.height / zoomFactor : 0;

  // Clamp lens position inside container
  let lensLeft = mousePos.x - lensWidth / 2;
  let lensTop = mousePos.y - lensHeight / 2;

  if (containerSize.width) {
    lensLeft = Math.max(0, Math.min(lensLeft, containerSize.width - lensWidth));
  }
  if (containerSize.height) {
    lensTop = Math.max(0, Math.min(lensTop, containerSize.height - lensHeight));
  }

  // Zoomed image offset calculations
  const zoomX = -lensLeft * zoomFactor;
  const zoomY = -lensTop * zoomFactor;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-visible cursor-zoom-in select-none lg:flex-1 flex flex-col lg:h-full",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Inner Image Container (Overflow Hidden) */}
      <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-md w-full lg:h-full lg:flex-1 flex flex-col justify-center">
        {/* Main Image Container */}
        <div className="relative aspect-square w-full lg:h-full lg:flex-1 sm:min-h-[400px]">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            loading="eager"
            className="object-contain p-6 select-none pointer-events-none"
            onError={() => setFailed(true)}
          />
        </div>

        {/* Magnifier Lens (Desktop Only) */}
        {isHovered && containerSize.width > 0 && (
          <div
            className="absolute border border-walton-teal bg-walton-teal/15 pointer-events-none hidden lg:block rounded shadow-[0_0_8px_rgba(57,169,189,0.3)]"
            style={{
              left: `${lensLeft}px`,
              top: `${lensTop}px`,
              width: `${lensWidth}px`,
              height: `${lensHeight}px`,
            }}
          />
        )}
      </div>

      {/* Zoom Detail Pane (Desktop Only - Floating to the right) */}
      <div
        className={cn(
          "absolute top-0 left-full ml-6 w-full h-full border border-zinc-200 bg-white shadow-2xl rounded-lg overflow-hidden z-50 pointer-events-none transition-all duration-200 hidden lg:block",
          isHovered ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 -translate-x-2"
        )}
      >
        {isHovered && (
          <div className="relative w-full h-full bg-white flex items-center justify-center">
            {/* High-res container displaying zoomed image */}
            <div
              className="absolute left-0 top-0 origin-top-left"
              style={{
                width: `${containerSize.width * zoomFactor}px`,
                height: `${containerSize.height * zoomFactor}px`,
                transform: `translate3d(${zoomX}px, ${zoomY}px, 0)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={`${alt} Zoomed`}
                className="w-full h-full object-contain p-12 bg-white"
                onError={() => setFailed(true)}
              />
            </div>
            {/* Floating zoom badge */}
            <div className="absolute bottom-3 right-3 bg-zinc-900/70 backdrop-blur-xs text-[10px] text-white px-2 py-0.5 rounded font-medium z-10">
              {zoomFactor}x Zoom
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
