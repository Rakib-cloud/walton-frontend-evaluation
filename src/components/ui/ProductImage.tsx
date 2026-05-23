"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/constants";

type ProductImageProps = Omit<ImageProps, "onError"> & {
  fallbackSrc?: string;
};

export function ProductImage({
  src,
  alt,
  fallbackSrc = PRODUCT_PLACEHOLDER_IMAGE,
  ...props
}: ProductImageProps) {
  const [prevSrc, setPrevSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  // If the src changes, reset the failed state during render
  if (src !== prevSrc) {
    setPrevSrc(src);
    setFailed(false);
  }

  return (
    <Image
      src={failed ? fallbackSrc : src}
      alt={alt}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
