"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import { HeartIcon } from "@/components/products/FilterSection";
import type { CatalogProduct } from "@/features/products/utils/product-helpers";
import { isInStock } from "@/features/products/utils/pricing";
import { formatCurrency } from "@/lib/format";
import {
  CARD_SURFACE,
  PRODUCT_CARD_CLASS,
  PRODUCT_PLACEHOLDER_IMAGE,
} from "@/lib/constants";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: CatalogProduct;
  className?: string;
};

function ProductCardComponent({ product, className }: ProductCardProps) {
  const { primaryVariant } = product;
  const [wishlisted, setWishlisted] = useState(false);
  const inStock = isInStock(primaryVariant);

  const hasDiscount =
    primaryVariant.discount != null &&
    primaryVariant.mrpPrice > product.sellingPrice;
  const saveAmount = hasDiscount
    ? primaryVariant.mrpPrice - product.sellingPrice
    : 0;

  const detailHref = `/products/${product.uid}`;

  return (
    <article className={cn(PRODUCT_CARD_CLASS, className)}>
      <Link href={detailHref} className="block shrink-0 px-4 pt-5">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[220px]">
          <Image
            src={product.imageUrl ?? PRODUCT_PLACEHOLDER_IMAGE}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
            className="object-contain"
          />
        </div>
      </Link>

      <div className="min-h-[76px] shrink-0 px-4 pt-4 text-center">
        <p className="line-clamp-2 text-[11px] font-medium uppercase leading-snug tracking-wide text-zinc-500">
          {product.modelCode}
        </p>
        <Link href={detailHref} className="mt-2 block">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-[#1e3a5f] hover:underline">
            {product.name}
          </h3>
        </Link>
      </div>

      <div className="mt-auto" style={{ backgroundColor: CARD_SURFACE }}>
        <div className="min-h-[96px] px-4 py-4">
          {hasDiscount ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm leading-tight text-[#ec1c24] line-through">
                  MSRP {formatCurrency(primaryVariant.mrpPrice)}
                </p>
                <p className="shrink-0 text-lg font-bold leading-tight text-[#1e3a5f]">
                  {formatCurrency(product.sellingPrice)}
                </p>
              </div>
              <p className="mt-2 text-left text-xs text-zinc-500">
                Save: {formatCurrency(saveAmount)}
              </p>
            </>
          ) : (
            <p className="text-sm font-bold text-[#1e3a5f]">
              MSRP {formatCurrency(product.sellingPrice)}
            </p>
          )}

          <p className="mt-2 text-left text-xs font-medium text-[#1e3a5f]">
            {inStock ? "Available In Selected Plaza" : "Out of Stock"}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-zinc-200/70 px-4 py-3">
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setWishlisted((value) => !value);
            }}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#dbe4f0] bg-white transition-colors hover:border-[#39a9bd]",
              wishlisted && "border-[#ec1c24] text-[#ec1c24]",
            )}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
          >
            <HeartIcon className="h-4 w-4 text-zinc-900" />
          </button>

          <Link
            href={detailHref}
            className={cn(
              "inline-flex h-8 shrink-0 items-center justify-center rounded-md px-4",
              "border border-transparent bg-[#2b3d6d] text-xs font-bold text-white",
              "transition-colors duration-200 hover:border-[#39a9bd] hover:bg-[#39a9bd]",
            )}
            aria-label={`Buy now — ${product.name}`}
          >
            {inStock ? "Buy Now" : "View Details"}
          </Link>
        </div>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardComponent);
