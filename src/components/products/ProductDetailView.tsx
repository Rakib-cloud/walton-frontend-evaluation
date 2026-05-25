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
import { normalizeVariant, toCatalogProduct } from "@/features/products/utils/product-helpers";
import { collectImageUrls } from "@/lib/images";
import { ProductDetailSidebar } from "@/components/products/detail/ProductDetailSidebar";

type ProductDetailViewProps = {
  product: ProductDetailFieldsFragment;
  relatedProducts?: any[];
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

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
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

  const relatedCatalogProducts = useMemo(() => {
    if (!relatedProducts) return [];
    return relatedProducts
      .map(toCatalogProduct)
      .filter((p): p is NonNullable<typeof p> => p !== null);
  }, [relatedProducts]);

  return (
    <article className="space-y-8 w-full min-w-0 overflow-hidden">
      <ProductDetailBreadcrumb productName={productName} />

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-4 lg:items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8 lg:space-y-10">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12 bg-white rounded-2xl border border-zinc-200 p-4 sm:p-6 shadow-xs w-full min-w-0 overflow-hidden">
            <ProductGallery
              images={images}
              productName={productName}
              className="lg:sticky lg:top-24 relative z-10"
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
        </div>

        {/* Sidebar widgets */}
        <ProductDetailSidebar relatedCatalogProducts={relatedCatalogProducts} />
      </div>
    </article>
  );
}
