"use client";

import { useApolloClient } from "@apollo/client/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFiltersBar } from "@/components/products/ProductFiltersBar";
import { ProductSortBar } from "@/components/products/ProductSortBar";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { assertGetProductsSuccess } from "@/graphql/client/api-response";
import { getFragmentData } from "@/graphql/generated";
import {
  GetProductsDocument,
  ProductCardFieldsFragmentDoc,
} from "@/graphql/generated/graphql";
import { filtersFromSearchParams } from "@/features/products/types/filters";
import {
  applyProductFilters,
  sortProducts,
} from "@/features/products/utils/filter-sort";
import {
  extractBrands,
  extractCategories,
  toCatalogProduct,
  type CatalogProduct,
} from "@/features/products/utils/product-helpers";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

type ProductsCatalogProps = {
  initialProducts: CatalogProduct[];
  totalCount: number;
};

export function ProductsCatalog({
  initialProducts,
  totalCount,
}: ProductsCatalogProps) {
  const client = useApolloClient();
  const searchParams = useSearchParams();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const productsScrollRef = useRef<HTMLElement | null>(null);
  const [scrollRoot, setScrollRoot] = useState<Element | null>(null);

  const [products, setProducts] = useState(initialProducts);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filters = useMemo(
    () =>
      filtersFromSearchParams(
        Object.fromEntries(searchParams.entries()),
      ),
    [searchParams],
  );

  const categories = useMemo(() => extractCategories(products), [products]);
  const brands = useMemo(() => extractBrands(products), [products]);
  const visibleProducts = useMemo(() => {
    const filtered = applyProductFilters(products, filters);
    return sortProducts(filtered, filters.sort);
  }, [products, filters]);

  const hasMore = products.length < totalCount;

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const { data } = await client.query({
        query: GetProductsDocument,
        variables: {
          pagination: { skip: products.length, limit: DEFAULT_PAGE_SIZE },
          filter: { isActive: true },
        },
      });

      if (!data) throw new Error("No response from API");

      assertGetProductsSuccess(data.getProducts);

      const nextProducts = data.getProducts.result.products
        .map((ref) => getFragmentData(ProductCardFieldsFragmentDoc, ref))
        .map(toCatalogProduct)
        .filter((product): product is CatalogProduct => product != null);

      setProducts((current) => {
        const existingIds = new Set(current.map((item) => item.uid));
        const unique = nextProducts.filter((item) => !existingIds.has(item.uid));
        return [...current, ...unique];
      });
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load more products",
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [client, hasMore, isLoadingMore, products.length]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");

    const syncScrollRoot = () => {
      setScrollRoot(mq.matches ? productsScrollRef.current : null);
    };

    syncScrollRoot();
    mq.addEventListener("change", syncScrollRoot);
    return () => mq.removeEventListener("change", syncScrollRoot);
  }, []);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore();
        }
      },
      { root: scrollRoot, rootMargin: "240px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadMore, scrollRoot]);

  return (
    <div className="grid gap-6 lg:h-[calc(100dvh-8rem)] lg:min-h-[28rem] lg:grid-cols-[280px_1fr] lg:items-start">
      <ProductFiltersBar categories={categories} brands={brands} />

      <section
        ref={productsScrollRef}
        className="lg:min-h-0 lg:h-full lg:overflow-y-auto lg:overscroll-y-contain lg:pr-1 scrollbar-none"
        aria-label="Product results"
      >
        <ProductSortBar
          itemCount={visibleProducts.length}
          categoryLabel={filters.category}
        />

        {visibleProducts.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-10 text-center">
            <p className="font-medium text-zinc-900">
              No products match your filters
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Try adjusting price, category, or availability.
            </p>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product, index) => (
              <li key={product.uid} className="flex">
                <ProductCard product={product} className="w-full" priority={index < 4} />
              </li>
            ))}
          </ul>
        )}

        {error ? (
          <p className="mt-6 text-center text-sm text-red-600">{error}</p>
        ) : null}

        <div ref={loadMoreRef} className="mt-8">
          {isLoadingMore ? (
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className="flex w-full">
                <ProductCardSkeleton className="w-full" />
              </li>
              ))}
            </ul>
          ) : hasMore ? (
            <p className="text-center text-sm text-zinc-500">
              Scroll to load more products
            </p>
          ) : products.length > 0 ? (
            <p className="text-center text-sm text-zinc-500">
              All products loaded
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
