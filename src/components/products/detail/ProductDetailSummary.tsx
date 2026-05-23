"use client";

import { AddToCartButton } from "@/components/products/AddToCartButton";
import { ProductDetailMeta, type ProductMetaItem } from "@/components/products/detail/ProductDetailMeta";
import { ProductPricing } from "@/components/products/ProductPricing";
import { VariantSelector } from "@/components/products/VariantSelector";
import type { ProductVariant } from "@/features/products/utils/pricing";
import { getSellingPrice, isInStock } from "@/features/products/utils/pricing";

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

  return (
    <div className="space-y-6 rounded-md border border-zinc-200 bg-white p-6 shadow-sm h-full flex flex-col justify-start">
      <header className="space-y-3 border-b border-zinc-100 pb-5">
        {modelCode ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {modelCode}
          </p>
        ) : null}
        <h1 className="text-2xl font-bold leading-tight text-[#1e3a5f] sm:text-3xl">
          {productName}
        </h1>
        <p className="text-sm text-zinc-500">
          {inStock ? "Available In Selected Plaza" : "Currently out of stock"}
        </p>
        <ProductDetailMeta items={metaItems} />
      </header>

      <ProductPricing variant={selectedVariant} />

      <VariantSelector
        variants={variants}
        selectedIndex={selectedIndex}
        onSelect={onSelectVariant}
      />

      <div className="flex flex-col gap-3 border-t border-zinc-100 pt-5 sm:flex-row mt-auto">
        <AddToCartButton
          uid={productUid}
          name={productName}
          imageUrl={imageUrl}
          posItemCode={selectedVariant.posItemCode || productUid}
          unitPrice={sellingPrice}
          disabled={!inStock}
          label="Buy Now"
          variant="buyNow"
          className="h-11 flex-1 rounded-md bg-[#2b3d6d] text-sm font-bold hover:bg-[#39a9bd] sm:flex-none sm:px-10"
        />
        <AddToCartButton
          uid={productUid}
          name={productName}
          imageUrl={imageUrl}
          posItemCode={selectedVariant.posItemCode || productUid}
          unitPrice={sellingPrice}
          disabled={!inStock}
          label="Add to Cart"
          className="h-11 flex-1 rounded-md border border-zinc-300 bg-white text-sm font-bold text-[#1e3a5f] hover:border-[#142D84] hover:bg-zinc-50 sm:flex-none sm:px-8"
        />
      </div>
    </div>
  );
}
