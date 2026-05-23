import type { SortOption } from "@/lib/constants";

export type AvailabilityFilter = "all" | "in-stock" | "out-of-stock";

export type ProductFilters = {
  minPrice: number | null;
  maxPrice: number | null;
  category: string | null;
  brand: string | null;
  availability: AvailabilityFilter;
  sort: SortOption;
};

export const DEFAULT_FILTERS: ProductFilters = {
  minPrice: null,
  maxPrice: null,
  category: null,
  brand: null,
  availability: "all",
  sort: "price-asc",
};

export function filtersFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): ProductFilters {
  const get = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const minPrice = get("minPrice");
  const maxPrice = get("maxPrice");
  const sort = get("sort") as SortOption | undefined;
  const availability = get("availability") as AvailabilityFilter | undefined;

  return {
    minPrice: minPrice ? Number(minPrice) : null,
    maxPrice: maxPrice ? Number(maxPrice) : null,
    category: get("category") ?? null,
    brand: get("brand") ?? null,
    availability: availability ?? "all",
    sort:
      sort === "price-desc" || sort === "rating-desc" || sort === "price-asc"
        ? sort
        : "price-asc",
  };
}

export function filtersToSearchParams(filters: ProductFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.minPrice != null) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice != null) params.set("maxPrice", String(filters.maxPrice));
  if (filters.category) params.set("category", filters.category);
  if (filters.brand) params.set("brand", filters.brand);
  if (filters.availability !== "all") {
    params.set("availability", filters.availability);
  }
  if (filters.sort !== "price-asc") params.set("sort", filters.sort);

  return params;
}
