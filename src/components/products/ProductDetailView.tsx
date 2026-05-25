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
import Image from "next/image";
import Link from "next/link";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/constants";
import { formatCurrency } from "@/lib/format";

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
    <article className="space-y-8">
      <ProductDetailBreadcrumb productName={productName} />

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-4 lg:items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8 lg:space-y-10">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12 bg-white rounded-2xl border border-zinc-200 p-4 sm:p-6 shadow-xs">
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
        <div className="lg:col-span-1 space-y-6">
          {/* Home Delivery Card */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                  {/* Truck icon */}
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 8h7.293a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1e3a5f]">Home Delivery</h4>
                  <p className="text-xs text-zinc-500">2 - 3 Days</p>
                </div>
              </div>
              <span className="text-sm font-bold text-zinc-800">৳700</span>
            </div>

            <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-3 text-xs text-zinc-600 leading-relaxed">
              <span className="font-semibold text-zinc-800">Notice:</span> As per the delivery policy, please receive your ordered product within 5 days; otherwise, it will be automatically cancelled.
            </div>

            <div className="flex items-center gap-3 border-t border-zinc-100 pt-3 text-xs font-semibold text-zinc-700">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-50 text-emerald-600">
                {/* Cash stack / notes icon */}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              Cash on Delivery Available
            </div>
          </div>

          {/* Return & Warranty Card */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1e3a5f] border-b border-zinc-100 pb-3">
              Return & Warranty
            </h4>

            <div className="space-y-3.5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  {/* Box icon */}
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-zinc-700 leading-snug">
                  Return as per company policy
                </p>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  {/* Shield icon */}
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-zinc-700 leading-snug">
                  Warranty as per company policy
                </p>
              </div>
            </div>
          </div>

          {/* Related Products Card */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1e3a5f] border-b border-zinc-100 pb-3">
              Related Products
            </h4>

            {relatedCatalogProducts.length > 0 ? (
              <ul className="divide-y divide-zinc-100">
                {relatedCatalogProducts.map((p) => {
                  const discount = p.primaryVariant?.discount;
                  const hasDiscount = discount && p.primaryVariant.mrpPrice > p.sellingPrice;
                  return (
                    <li key={p.uid} className="py-3 first:pt-0 last:pb-0 flex gap-3 items-center">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-zinc-100 bg-white p-1">
                        <Image
                          src={p.imageUrl ?? PRODUCT_PLACEHOLDER_IMAGE}
                          alt={p.name}
                          fill
                          sizes="56px"
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${p.uid}`} className="text-xs font-bold text-[#1e3a5f] hover:underline line-clamp-1 block">
                          {p.name}
                        </Link>
                        <p className="text-[10px] font-semibold text-zinc-400 mt-0.5 truncate uppercase">
                          {p.modelCode}
                        </p>
                        <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                          <span className="text-xs font-extrabold text-[#ec1c24]">
                            {formatCurrency(p.sellingPrice)}
                          </span>
                          {hasDiscount ? (
                            <span className="text-[10px] text-zinc-400 line-through">
                              {formatCurrency(p.primaryVariant.mrpPrice)}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-xs text-zinc-400">No related products found.</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
