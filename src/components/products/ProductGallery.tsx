"use client";

import Image from "next/image";
import { useState } from "react";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/constants";
import { cn } from "@/lib/cn";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : [PRODUCT_PLACEHOLDER_IMAGE];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
        <Image
          src={galleryImages[activeIndex] ?? PRODUCT_PLACEHOLDER_IMAGE}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {galleryImages.length > 1 ? (
        <ul className="flex gap-3 overflow-x-auto pb-1">
          {galleryImages.map((url, index) => (
            <li key={`${url}-${index}`}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors",
                  index === activeIndex
                    ? "border-zinc-900"
                    : "border-transparent hover:border-zinc-300",
                )}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={url}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
