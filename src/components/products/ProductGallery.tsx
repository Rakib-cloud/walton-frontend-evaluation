"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { collectImageUrls } from "@/lib/images";

type ProductGalleryProps = {
  images: string[];
  productName: string;
  className?: string;
};

function GalleryImage({
  src,
  alt,
  priority,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes: string;
}) {
  const [failed, setFailed] = useState(false);
  const imageSrc = failed ? PRODUCT_PLACEHOLDER_IMAGE : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export function ProductGallery({
  images,
  productName,
  className,
}: ProductGalleryProps) {
  const galleryImages = collectImageUrls(images);
  const slides =
    galleryImages.length > 0 ? galleryImages : [PRODUCT_PLACEHOLDER_IMAGE];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSrc = slides[activeIndex] ?? PRODUCT_PLACEHOLDER_IMAGE;
  const hasMultiple = slides.length > 1;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length],
  );

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
        <div className="relative aspect-square w-full min-h-[280px] sm:min-h-[360px]">
          <GalleryImage
            key={activeSrc}
            src={activeSrc}
            alt={productName}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6"
          />
        </div>

        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/95 text-zinc-700 shadow-sm transition-colors hover:border-[#39a9bd] hover:text-[#39a9bd]"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/95 text-zinc-700 shadow-sm transition-colors hover:border-[#39a9bd] hover:text-[#39a9bd]"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <p className="absolute bottom-3 right-3 rounded-md bg-black/55 px-2.5 py-1 text-xs font-medium text-white">
              {activeIndex + 1} / {slides.length}
            </p>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <ul className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {slides.map((url, index) => (
            <li key={`${url}-${index}`} className="shrink-0">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative block h-20 w-20 overflow-hidden rounded-md border-2 bg-white transition-colors",
                  index === activeIndex
                    ? "border-[#142D84]"
                    : "border-zinc-200 hover:border-[#39a9bd]",
                )}
                aria-label={`View image ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <GalleryImage
                  src={url}
                  alt=""
                  sizes="80px"
                  className="object-contain p-1.5"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}
