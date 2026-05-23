"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { FilterSection, FunnelIcon } from "@/components/products/FilterSection";
import { PriceRangeFilter } from "@/components/products/PriceRangeFilter";
import type { ProductFilters } from "@/features/products/types/filters";
import { filtersToSearchParams } from "@/features/products/types/filters";
import { cn } from "@/lib/cn";
import { PRICE_FILTER_BOUNDS } from "@/lib/constants";

type ProductFiltersBarProps = {
  categories: string[];
  brands: string[];
  className?: string;
};

const CHECKBOX_CLASS =
  "h-4 w-4 rounded border-zinc-300 text-[#142D84] accent-[#142D84] focus:ring-[#142D84]";

export function ProductFiltersBar({
  categories,
  brands,
  className,
}: ProductFiltersBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = useMemo(
    (): Omit<ProductFilters, "sort"> => ({
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
    }),
    [searchParams],
  );

  const updateFilters = useCallback(
    (patch: Partial<Omit<ProductFilters, "sort">>) => {
      const sort =
        (searchParams.get("sort") as ProductFilters["sort"]) ?? "price-asc";
      const next = { ...filters, ...patch, sort };
      const params = filtersToSearchParams(next);
      router.replace(`/products?${params.toString()}`, { scroll: false });
    },
    [filters, router, searchParams],
  );

  const sliderMin = filters.minPrice ?? PRICE_FILTER_BOUNDS.min;
  const sliderMax = filters.maxPrice ?? PRICE_FILTER_BOUNDS.max;
  const displayBrands = brands.length > 0 ? brands : ["Walton"];

  return (
    <aside
      className={cn(
        "space-y-3 lg:sticky lg:top-0 lg:max-h-full lg:self-start lg:overflow-y-auto lg:overscroll-y-contain lg:pr-1 scrollbar-none",
        className,
      )}
    >
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base font-semibold text-[#1e3a5f]">Filters</h2>
        <button
          type="button"
          onClick={() => router.replace("/products", { scroll: false })}
          className="text-xs font-medium text-[#142D84] hover:underline"
        >
          Reset all
        </button>
      </div>

      <FilterSection title="Brand">
        <ul className="space-y-2.5">
          {displayBrands.map((brand) => (
            <li key={brand}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  checked={filters.brand === brand}
                  onChange={() =>
                    updateFilters({
                      brand: filters.brand === brand ? null : brand,
                    })
                  }
                  className={CHECKBOX_CLASS}
                />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Category">
        {categories.length > 0 ? (
          <ul className="space-y-2.5">
            {categories.map((category) => (
              <li key={category}>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={filters.category === category}
                    onChange={() =>
                      updateFilters({
                        category:
                          filters.category === category ? null : category,
                      })
                    }
                    className={CHECKBOX_CLASS}
                  />
                  {category}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">
            Categories appear as products load.
          </p>
        )}
      </FilterSection>

      <FilterSection
        title="Price"
        icon={<FunnelIcon className="h-4 w-4 text-[#142D84]" />}
      >
        <PriceRangeFilter
          bounds={PRICE_FILTER_BOUNDS}
          valueMin={sliderMin}
          valueMax={sliderMax}
          onChange={(min, max) => {
            const atBounds =
              min === PRICE_FILTER_BOUNDS.min &&
              max === PRICE_FILTER_BOUNDS.max;
            updateFilters({
              minPrice: atBounds ? null : min,
              maxPrice: atBounds ? null : max,
            });
          }}
        />
      </FilterSection>

      <FilterSection title="Availability">
        <ul className="space-y-2.5">
          {[
            { value: "all", label: "All products" },
            { value: "in-stock", label: "In stock only" },
            { value: "out-of-stock", label: "Out of stock" },
          ].map((option) => (
            <li key={option.value}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-700">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === option.value}
                  onChange={() =>
                    updateFilters({
                      availability:
                        option.value as ProductFilters["availability"],
                    })
                  }
                  className={CHECKBOX_CLASS}
                />
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>
    </aside>
  );
}
