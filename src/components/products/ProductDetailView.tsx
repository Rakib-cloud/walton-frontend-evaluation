"use client";

import { useMemo, useState } from "react";
import { ProductDetailBreadcrumb } from "@/components/products/detail/ProductDetailBreadcrumb";
import { ProductDetailInfo } from "@/components/products/detail/ProductDetailInfo";
import { ProductDetailSummary } from "@/components/products/detail/ProductDetailSummary";
import type { ProductMetaItem } from "@/components/products/detail/ProductDetailMeta";
import { ProductGallery } from "@/components/products/ProductGallery";
import type { ProductDetailFieldsFragment } from "@/graphql/generated/graphql";
import {
  getPrimaryVariant,
  isInStock,
  type ProductVariant,
} from "@/features/products/utils/pricing";
import { getDetailAttributeValue } from "@/features/products/utils/detail-sections";
import { normalizeVariant } from "@/features/products/utils/product-helpers";
import { collectImageUrls } from "@/lib/images";

type ProductDetailViewProps = {
  product: ProductDetailFieldsFragment;
};

function getModelCode(product: ProductDetailFieldsFragment): string | null {
  return getDetailAttributeValue(product.productAttributes, [/^model$/i]);
}

function buildMetaItems(
  product: ProductDetailFieldsFragment,
  variant: ProductVariant,
): ProductMetaItem[] {
  return [
    {
      label: "Brand",
      value:
        getDetailAttributeValue(product.productAttributes, [/^brand$/i]) ?? "",
    },
    {
      label: "Series",
      value:
        getDetailAttributeValue(product.productAttributes, [/^series/i]) ?? "",
    },
    {
      label: "Product ID",
      value: product.uid,
    },
    {
      label: "POS Item Code",
      value: variant.posItemCode ?? "",
    },
    {
      label: "EBS Item Code",
      value: variant.ebsItemCode ?? "",
    },
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

  const images = useMemo(
    () => collectImageUrls(product.images.map((image) => image.url)),
    [product.images],
  );

  const productName = product.enName ?? "Product";
  const modelCode = getModelCode(product);
  const metaItems = useMemo(
    () => buildMetaItems(product, selectedVariant),
    [product, selectedVariant],
  );

  return (
    <article className="space-y-10">
      <ProductDetailBreadcrumb productName={productName} />

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
        <ProductGallery
          images={images}
          productName={productName}
          className="lg:sticky lg:top-24"
        />

        <ProductDetailSummary
          productUid={product.uid}
          productName={productName}
          modelCode={modelCode}
          metaItems={metaItems}
          imageUrl={images[0]}
          variants={variants}
          selectedIndex={selectedIndex}
          onSelectVariant={setSelectedIndex}
        />
      </div>

      <ProductDetailInfo product={product} />
    </article>
  );
}
