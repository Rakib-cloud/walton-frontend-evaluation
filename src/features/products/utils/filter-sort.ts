import type { ProductFilters } from "@/features/products/types/filters";
import type { CatalogProduct } from "@/features/products/utils/product-helpers";

export function applyProductFilters(
  products: CatalogProduct[],
  filters: ProductFilters,
): CatalogProduct[] {
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }

    if (filters.availability === "in-stock" && !product.inStock) {
      return false;
    }

    if (filters.availability === "out-of-stock" && product.inStock) {
      return false;
    }

    if (filters.minPrice != null && product.sellingPrice < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice != null && product.sellingPrice > filters.maxPrice) {
      return false;
    }

    return true;
  });
}

export function sortProducts(
  products: CatalogProduct[],
  sort: ProductFilters["sort"],
): CatalogProduct[] {
  const sorted = [...products];

  switch (sort) {
    case "price-desc":
      return sorted.sort((a, b) => b.sellingPrice - a.sellingPrice);
    case "rating-desc":
      return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "price-asc":
    default:
      return sorted.sort((a, b) => a.sellingPrice - b.sellingPrice);
  }
}
