"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { VariantSelector } from "@/components/products/VariantSelector";
import type { ProductVariant } from "@/features/products/utils/pricing";
import { getSellingPrice, isInStock } from "@/features/products/utils/pricing";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { ProductMetaItem } from "@/components/products/detail/ProductDetailMeta";

type ProductDetailSummaryProps = {
  productUid: string;
  productName: string;
  modelCode: string | null;
  metaItems: ProductMetaItem[];
  imageUrl?: string;
  variants: ProductVariant[];
  selectedIndex: number;
  onSelectVariant: (index: number) => void;
};

export function ProductDetailSummary({
  productUid,
  productName,
  modelCode,
  metaItems,
  imageUrl,
  variants,
  selectedIndex,
  onSelectVariant,
}: ProductDetailSummaryProps) {
  const selectedVariant = variants[selectedIndex] ?? variants[0]!;
  const sellingPrice = getSellingPrice(selectedVariant);
  const inStock = isInStock(selectedVariant);
  const [quantity, setQuantity] = useState(1);

  const hasDiscount =
    selectedVariant.discount != null && selectedVariant.mrpPrice > sellingPrice;
  const saveAmount = hasDiscount ? selectedVariant.mrpPrice - sellingPrice : 0;

  const brandName = metaItems.find((item) => item.label === "Brand")?.value || "WALTON";
  const categoryName = metaItems.find((item) => item.label === "Series")?.value || "";

  const isEmiValid = sellingPrice >= 10000;
  const emiMonths = 6;
  const emiDiscountPercent = 5;
  const emiDiscountedPrice = sellingPrice * (1 - emiDiscountPercent / 100);
  const startingEmi = Math.ceil(emiDiscountedPrice / emiMonths);

  return (
    <div className="space-y-6 flex flex-col justify-start h-full text-zinc-800">
      {/* Title & Model Code */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#1e3a5f] leading-snug">
          {productName}
        </h1>
        {modelCode ? (
          <p className="text-sm font-bold text-zinc-900 uppercase">
            {modelCode}
          </p>
        ) : null}
      </div>

      {/* Pricing Section */}
      <div className="space-y-1">
        {hasDiscount ? (
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-sm font-bold text-[#ec1c24] line-through">
              MSRP {formatCurrency(selectedVariant.mrpPrice)}
            </span>
            <span className="text-2xl font-extrabold text-[#1e3a5f]">
              {formatCurrency(sellingPrice)}
            </span>
          </div>
        ) : (
          <span className="text-2xl font-extrabold text-[#1e3a5f]">
            {formatCurrency(sellingPrice)}
          </span>
        )}
        {hasDiscount && (
          <p className="text-xs text-zinc-500 font-semibold">
            Save: {formatCurrency(saveAmount)}
          </p>
        )}
      </div>

      {/* EMI Badge */}
      <div className="flex items-center gap-3 text-xs">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-bold text-emerald-600 border border-emerald-100">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          EMI available
        </span>
        <a href="#emi-plans" className="font-bold text-blue-600 hover:underline">
          View Plans &gt;
        </a>
      </div>

      {/* Available Offers */}
      <div className="space-y-2.5 pt-1">
        <div className="relative inline-block bg-amber-50 px-4 py-0.5 text-xs font-bold text-amber-800 rounded-r-md border-l-3 border-amber-500">
          Available Offers
        </div>
        <ul className="space-y-2 text-xs text-zinc-700">
          <li className="flex items-start gap-2">
            <svg className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>
              <span className="font-bold">EMI</span> Valid For Cart Value Above <span className="font-semibold">৳10,000</span> <span className="text-blue-600 hover:underline cursor-pointer">T&C</span>
            </span>
          </li>
          {isEmiValid && (
            <li className="flex items-start gap-2">
              <svg className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                <span className="font-bold">EMI Discount</span> Get <span className="font-bold text-emerald-600">{emiDiscountPercent}% OFF</span>, Starting <span className="font-semibold">{formatCurrency(startingEmi)}/Month</span> <span className="text-blue-600 hover:underline cursor-pointer">More</span>
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Brand & Categories Info */}
      <div className="space-y-2 text-xs pt-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-500">Brand</span>
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
          <span className="font-extrabold text-[#1e3a5f] flex items-center gap-1 uppercase">
            {brandName}
            {/* Verified badge */}
            <svg className="h-4 w-4 text-blue-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#3b82f6" />
            </svg>
          </span>
        </div>
        {categoryName && (
          <div className="pl-9">
            <a href={`/products?category=${categoryName}`} className="font-bold text-blue-600 hover:underline flex items-center gap-0.5">
              See More Products From {categoryName} &gt;
            </a>
          </div>
        )}
      </div>

      {/* Stock Locator */}
      <div className="flex items-center gap-2 text-xs flex-wrap">
        <span className="font-bold text-zinc-500">Stock</span>
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
        <span
          className={cn(
            "rounded px-2.5 py-1 text-xs font-bold",
            inStock
              ? "bg-[#142D84]/10 text-[#142D84]"
              : "bg-red-100 text-red-800",
          )}
        >
          {inStock
            ? `${selectedVariant.quantity} in stock`
            : "Out of stock"}
        </span>
        <div className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50/50 px-2 py-1 font-semibold text-emerald-700">
          {/* Stock locator / map pin check icon */}
          <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Find Available Stock
          <button type="button" className="ml-1 rounded bg-[#39a9bd] px-2 py-0.5 text-[10px] font-bold text-white hover:bg-walton-blue cursor-pointer transition-colors border-none">
            Check &gt;
          </button>
        </div>
      </div>

      {/* Variant Selector */}
      <VariantSelector
        variants={variants}
        selectedIndex={selectedIndex}
        onSelect={onSelectVariant}
      />

      {/* Quantity Selector */}
      <div className="flex items-center gap-4 py-1">
        <span className="text-xs font-bold text-[#1e3a5f] w-12 shrink-0">Quantity</span>
        <div className="flex items-center rounded-lg border border-zinc-300 bg-zinc-50 overflow-hidden">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-8 w-8 flex items-center justify-center text-zinc-600 hover:text-zinc-950 font-bold hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            -
          </button>
          <span className="min-w-8 text-center text-xs font-bold text-zinc-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="h-8 w-8 flex items-center justify-center text-zinc-600 hover:text-zinc-950 font-bold hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {/* Custom Buy Now & Add to Cart Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 border-t border-zinc-100 pt-5">
        <div className="flex w-full sm:flex-1 overflow-hidden rounded-xl bg-[#ec1c24] text-white shadow-xs hover:shadow-md transition-all hover:bg-[#d61920]">
          {/* Icon block */}
          <div className="flex items-center justify-center bg-amber-500 px-4 py-3 text-white border-r border-black/10 shrink-0">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          
          <AddToCartButton
            uid={productUid}
            name={productName}
            imageUrl={imageUrl}
            posItemCode={selectedVariant.posItemCode || productUid}
            unitPrice={sellingPrice}
            disabled={!inStock}
            quantity={quantity}
            label="Buy Now"
            variant="buyNow"
            className="flex-1 rounded-none bg-transparent hover:bg-transparent h-auto py-3 text-xs sm:text-sm font-extrabold text-white cursor-pointer"
          />
        </div>

        <AddToCartButton
          uid={productUid}
          name={productName}
          imageUrl={imageUrl}
          posItemCode={selectedVariant.posItemCode || productUid}
          unitPrice={sellingPrice}
          disabled={!inStock}
          quantity={quantity}
          label="Add to Cart"
          className="w-full sm:flex-1 h-[48px] rounded-xl border border-zinc-200 bg-white text-xs sm:text-sm font-extrabold text-zinc-700 hover:border-[#142D84] hover:bg-zinc-50 transition-colors cursor-pointer"
        />
      </div>
    </div>
  );
}
