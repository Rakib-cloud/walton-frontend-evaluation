"use client";

import { useMemo, useState } from "react";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { LabeledSectionTabs } from "@/components/products/LabeledSectionTabs";
import type { LabeledSection } from "@/components/products/LabeledSectionTabs";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductPricing } from "@/components/products/ProductPricing";
import { VariantSelector } from "@/components/products/VariantSelector";
import type { ProductDetailFieldsFragment } from "@/graphql/generated/graphql";
import {
  getPrimaryVariant,
  getSellingPrice,
  isInStock,
  type ProductVariant,
} from "@/features/products/utils/pricing";
import { normalizeVariant } from "@/features/products/utils/product-helpers";

type ProductDetailViewProps = {
  product: ProductDetailFieldsFragment;
};

function toSections(
  product: ProductDetailFieldsFragment,
): LabeledSection[] {
  const mapSection = (
    id: string,
    title: string,
    groups: ProductDetailFieldsFragment["productAttributes"],
  ): LabeledSection => ({
    id,
    title,
    items:
      groups?.map((group) => ({
        label: group.enLabel,
        values:
          group.values
            .map((value) => value.enName)
            .filter((value): value is string => Boolean(value)) ?? [],
      })) ?? [],
  });

  return [
    mapSection("basic", "Basic Information", product.productAttributes),
    mapSection("detailed", "Detailed Information", product.detailedDescriptions),
    mapSection("delivery", "Terms & Conditions", product.deliveries),
    mapSection("warranty", "Warranty Information", product.serviceAndDeliveries),
    mapSection("features", "Special Features", product.priceAndStocks),
  ];
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const variants = useMemo(
    () => product.variants.map(normalizeVariant),
    [product.variants],
  );

  const defaultIndex = useMemo(() => {
    const inStockIndex = variants.findIndex((variant) => isInStock(variant));
    return inStockIndex >= 0 ? inStockIndex : 0;
  }, [variants]);

  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const selectedVariant: ProductVariant =
    variants[selectedIndex] ?? getPrimaryVariant(variants) ?? variants[0]!;

  const sections = useMemo(() => toSections(product), [product]);
  const images = product.images.map((image) => image.url);
  const sellingPrice = getSellingPrice(selectedVariant);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <ProductGallery
        images={images}
        productName={product.enName ?? "Product"}
      />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {product.enName ?? "Product"}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">SKU: {product.uid}</p>
        </div>

        <ProductPricing variant={selectedVariant} />
        <VariantSelector
          variants={variants}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />

        <AddToCartButton
          uid={product.uid}
          name={product.enName ?? "Product"}
          imageUrl={images[0]}
          posItemCode={selectedVariant.posItemCode || product.uid}
          unitPrice={sellingPrice}
          disabled={!isInStock(selectedVariant)}
          label="Buy Now"
          variant="buyNow"
          className="w-full py-3 text-base"
        />
      </div>

      <div className="lg:col-span-2">
        <LabeledSectionTabs sections={sections} />
      </div>
    </div>
  );
}