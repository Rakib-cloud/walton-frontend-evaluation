"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ListIcon, SortIcon } from "@/components/products/FilterSection";
import type { ProductFilters } from "@/features/products/types/filters";
import {
  DEFAULT_FILTERS,
  filtersToSearchParams,
} from "@/features/products/types/filters";
import { SORT_OPTIONS } from "@/lib/constants";

type ProductSortBarProps = {
  itemCount: number;
  categoryLabel?: string | null;
};

export function ProductSortBar({ itemCount, categoryLabel }: ProductSortBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = useMemo(
    () =>
      (searchParams.get("sort") as ProductFilters["sort"]) ??
      DEFAULT_FILTERS.sort,
    [searchParams],
  );

  const updateSort = useCallback(
    (nextSort: ProductFilters["sort"]) => {
      const params = filtersToSearchParams({
        minPrice: searchParams.get("minPrice")
          ? Number(searchParams.get("minPrice"))
          : null,
        maxPrice: searchParams.get("maxPrice")
          ? Number(searchParams.get("maxPrice"))
          : null,
        category: searchParams.get("category"),
        brand: searchParams.get("brand"),
        availability:
          (searchParams.get("availability") as ProductFilters["availability"]) ??
          "all",
        sort: nextSort,
      });
      router.replace(`/products?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const label = categoryLabel
    ? `${itemCount} items found in ${categoryLabel}`
    : `${itemCount} items found`;

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-4 py-3">
      <p className="flex items-center gap-2 text-sm text-zinc-700">
        <ListIcon className="h-4 w-4 text-zinc-500" />
        <span>{label}</span>
      </p>

      <div className="flex items-center gap-2">
        <SortIcon className="h-4 w-4 text-zinc-500" />
        <label htmlFor="sort" className="text-sm font-medium text-zinc-700">
          Sort
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(event) =>
            updateSort(event.target.value as ProductFilters["sort"])
          }
          className="h-9 min-w-[180px] rounded border border-zinc-300 bg-white px-3 text-sm text-zinc-800 focus:border-walton-blue focus:outline-none focus:ring-1 focus:ring-walton-blue"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
