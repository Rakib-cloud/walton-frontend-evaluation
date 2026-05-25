"use client";

import { useCallback, useState, useEffect } from "react";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { collectImageUrls } from "@/lib/images";
import { ProductImageZoom } from "@/components/products/ProductImageZoom";
import { ProductImage } from "@/components/ui/ProductImage";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchPlusIcon,
  CloseIcon,
} from "@/components/ui/Icons";

type ProductGalleryProps = {
  images: string[];
  productName: string;
  className?: string;
};

export function ProductGallery({
  images,
  productName,
  className,
}: ProductGalleryProps) {
  const galleryImages = collectImageUrls(images);
  const slides =
    galleryImages.length > 0 ? galleryImages : [PRODUCT_PLACEHOLDER_IMAGE];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const activeSrc = slides[activeIndex] ?? PRODUCT_PLACEHOLDER_IMAGE;
  const hasMultiple = slides.length > 1;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length],
  );

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goTo(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        goTo(activeIndex + 1);
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, activeIndex, goTo]);

  return (
    <div className={cn("flex flex-col lg:h-full space-y-4", className)}>
      {/* Main Image Container with Magnifier */}
      <div className="relative group overflow-visible lg:flex-1 flex flex-col w-[70%] sm:w-full mx-auto">
        {/* Floating Zoom & Lightbox badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-zinc-700 text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-semibold z-10 border border-zinc-200/60 flex items-center gap-1.5 shadow-xs pointer-events-none transition-colors group-hover:bg-white group-hover:text-walton-blue">
          <SearchPlusIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-walton-teal" />
          <span className="hidden sm:inline">Hover to zoom, click to expand</span>
          <span className="sm:hidden">Tap to expand</span>
        </div>

        {/* Dynamic Zoom Component */}
        <ProductImageZoom
          src={activeSrc}
          alt={productName}
          zoomFactor={2.5}
          onClick={() => setIsLightboxOpen(true)}
          className="w-full lg:h-full lg:flex-1 flex flex-col"
        />

        {/* Carousel Prev/Next Overlay buttons for quick swapping (Mobile/Tablet and fallback) */}
        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(activeIndex - 1);
              }}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/95 text-zinc-700 shadow-xs transition-all hover:scale-105 hover:border-walton-teal hover:text-walton-teal lg:opacity-0 lg:group-hover:opacity-100 focus:outline-none cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-4.5 w-4.5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(activeIndex + 1);
              }}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/95 text-zinc-700 shadow-xs transition-all hover:scale-105 hover:border-walton-teal hover:text-walton-teal lg:opacity-0 lg:group-hover:opacity-100 focus:outline-none cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-4.5 w-4.5" />
            </button>
            <p className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white shadow-xs">
              {activeIndex + 1} / {slides.length}
            </p>
          </>
        ) : null}
      </div>

      {/* Styled Thumbnails Selector */}
      {slides.length >= 1 ? (
        <div className="relative">
          <ul className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory scroll-smooth">
            {slides.map((url, index) => (
              <li key={`${url}-${index}`} className="shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative block h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-lg border-2 bg-white transition-all duration-300 ease-out shadow-xs cursor-pointer",
                    index === activeIndex
                      ? "border-walton-blue ring-3 ring-walton-blue/10 scale-95"
                      : "border-zinc-200 hover:border-walton-teal hover:-translate-y-0.5 hover:shadow-md active:scale-95",
                  )}
                  aria-label={`View image ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <ProductImage
                    src={url}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-1.5"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-zinc-950/95 backdrop-blur-md animate-fade-in">
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 sm:p-6 text-white z-10 bg-gradient-to-b from-black/50 to-transparent">
            <div>
              <h2 className="text-sm sm:text-base font-semibold truncate max-w-[250px] sm:max-w-md">
                {productName}
              </h2>
              {hasMultiple && (
                <p className="text-xs text-zinc-400">
                  Image {activeIndex + 1} of {slides.length}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105 focus:outline-none cursor-pointer"
              aria-label="Close fullscreen"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Large Image Frame */}
          <div className="relative flex-1 flex items-center justify-center p-4">
            {hasMultiple && (
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            )}

            <div className="relative w-full h-full max-w-4xl max-h-[70vh] flex items-center justify-center">
              <ProductImage
                key={`lightbox-${activeSrc}`}
                src={activeSrc}
                alt={productName}
                fill
                priority
                sizes="100vw"
                className="object-contain p-2 select-none"
              />
            </div>

            {hasMultiple && (
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Navigation in Lightbox */}
          {slides.length >= 1 && (
            <div className="w-full bg-gradient-to-t from-black/50 to-transparent p-4 sm:p-6 flex flex-col items-center gap-3">
              <ul className="flex gap-2.5 overflow-x-auto max-w-full pb-2 scrollbar-none">
                {slides.map((url, index) => (
                  <li key={`lightbox-thumb-${url}-${index}`} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "relative block h-12 w-12 sm:h-16 sm:w-16 overflow-hidden rounded-md border-2 bg-zinc-900 transition-all cursor-pointer",
                        index === activeIndex
                          ? "border-walton-teal scale-105 shadow-lg shadow-walton-teal/20"
                          : "border-zinc-700 hover:border-zinc-500",
                      )}
                      aria-label={`View image ${index + 1}`}
                    >
                      <ProductImage
                        src={url}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
