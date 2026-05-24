export const DEFAULT_PAGE_SIZE = 12;

export const PRODUCT_PLACEHOLDER_IMAGE = "/images/product-placeholder.svg";

export const CARD_SURFACE = "#fffff6";

export const PRICE_FILTER_MIN = 0;
export const PRICE_FILTER_MAX = 200_000;
export const PRICE_FILTER_BOUNDS = {
  min: PRICE_FILTER_MIN,
  max: PRICE_FILTER_MAX,
} as const;

/** Shared layout classes so skeleton matches loaded product cards */
export const PRODUCT_CARD_CLASS =
  "flex h-full w-full min-h-[440px] flex-col overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-xl";

export const SORT_OPTIONS = [
  { value: "price-asc", label: "Price Low to High" },
  { value: "price-desc", label: "Price High to Low" },
  { value: "rating-desc", label: "Rating High to Low" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
