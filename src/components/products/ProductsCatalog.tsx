"use client";

import { useApolloClient } from "@apollo/client/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFiltersBar } from "@/components/products/ProductFiltersBar";
import { ProductSortBar } from "@/components/products/ProductSortBar";
import { CatalogGridSkeleton } from "@/components/skeletons/CatalogGridSkeleton";
import { assertGetProductsSuccess } from "@/graphql/client/api-response";
import { getFragmentData } from "@/graphql/generated";
import {
  GetProductsDocument,
  ProductCardFieldsFragmentDoc,
} from "@/graphql/generated/graphql";
import {
  filtersFromSearchParams,
  filtersToSearchParams,
} from "@/features/products/types/filters";
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

  const [products, setProducts] = useState(initialProducts);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(initialProducts.length);
  const [hasMore, setHasMore] = useState(
    initialProducts.length >= DEFAULT_PAGE_SIZE && initialProducts.length < totalCount
  );

  const [filters, setFilters] = useState(() =>
    filtersFromSearchParams(
      Object.fromEntries(searchParams.entries()),
    )
  );

  useEffect(() => {
    setFilters(
      filtersFromSearchParams(
        Object.fromEntries(searchParams.entries()),
      )
    );
    setIsFiltering(false);
  }, [searchParams]);

  const handleFilterChange = useCallback((nextFilters: typeof filters) => {
    setFilters(nextFilters);
    const params = filtersToSearchParams(nextFilters);
    window.history.replaceState(null, "", `/products?${params.toString()}`);
  }, []);

  const categories = useMemo(() => extractCategories(products), [products]);
  const brands = useMemo(() => extractBrands(products), [products]);
  const visibleProducts = useMemo(() => {
    const filtered = applyProductFilters(products, filters);
    return sortProducts(filtered, filters.sort);
  }, [products, filters]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const { data } = await client.query({
        query: GetProductsDocument,
        variables: {
          pagination: { skip, limit: DEFAULT_PAGE_SIZE },
          filter: { isActive: true },
        },
      });

      if (!data) throw new Error("No response from API");

      assertGetProductsSuccess(data.getProducts);

      const nextRawProducts = data.getProducts.result.products || [];
      const fetchedLength = nextRawProducts.length;

      const nextProducts = nextRawProducts
        .map((ref) => getFragmentData(ProductCardFieldsFragmentDoc, ref))
        .map(toCatalogProduct)
        .filter((product): product is CatalogProduct => product != null);

      setProducts((current) => {
        const existingIds = new Set(current.map((item) => item.uid));
        const unique = nextProducts.filter((item) => !existingIds.has(item.uid));
        return [...current, ...unique];
      });

      setSkip((current) => current + fetchedLength);

      if (fetchedLength < DEFAULT_PAGE_SIZE || (skip + fetchedLength) >= totalCount) {
        setHasMore(false);
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load more products",
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [client, hasMore, isLoadingMore, skip, totalCount]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore();
        }
      },
      { root: null, rootMargin: "240px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Prevent body scroll when filter drawer is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileFilterOpen]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start relative">
      {/* Mobile Drawer Wrapper for Filters */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex lg:hidden transition-opacity duration-300",
          isMobileFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Backdrop */}
        <div 
          className={cn(
            "fixed inset-0 bg-black/50 transition-opacity duration-300",
            isMobileFilterOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMobileFilterOpen(false)} 
          aria-hidden="true" 
        />
        
        {/* Drawer Content */}
        <div
          className={cn(
            "relative w-4/5 max-w-sm bg-white h-full p-4 sm:p-6 shadow-2xl transition-transform duration-300 flex flex-col",
            isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <ProductFiltersBar 
            categories={categories} 
            brands={brands} 
            filters={filters}
            onChange={handleFilterChange}
            onClose={() => setIsMobileFilterOpen(false)}
            onStartFiltering={() => setIsFiltering(true)}
            className="flex-1 overflow-y-auto"
          />
        </div>
      </div>

      {/* Desktop Sticky Sidebar for Filters */}
      <aside className="hidden lg:block lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:pr-1 scrollbar-none">
        <ProductFiltersBar 
          categories={categories} 
          brands={brands} 
          filters={filters}
          onChange={handleFilterChange}
          onStartFiltering={() => setIsFiltering(true)}
        />
      </aside>

      <section
        className="w-full"
        aria-label="Product results"
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-5">
          <button
            type="button"
            className="lg:hidden flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 active:scale-[0.98] transition-all cursor-pointer"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <svg className="h-5 w-5 text-walton-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Show Filters
          </button>
          <div className="flex-1">
            <ProductSortBar
              itemCount={visibleProducts.length}
              sort={filters.sort}
              onSortChange={(sort) => handleFilterChange({ ...filters, sort })}
              categoryLabel={filters.category}
              onStartFiltering={() => setIsFiltering(true)}
            />
          </div>
        </div>

        {isFiltering ? (
          <CatalogGridSkeleton count={6} />
        ) : visibleProducts.length === 0 ? (
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
          {isFiltering ? null : isLoadingMore ? (
            <CatalogGridSkeleton count={3} />
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
