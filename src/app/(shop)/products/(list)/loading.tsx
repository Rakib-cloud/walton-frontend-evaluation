import {
  ProductFiltersSkeleton,
  ProductSortBarSkeleton,
} from "@/components/products/ProductFiltersSkeleton";
import { CatalogGridSkeleton } from "@/components/skeletons/CatalogGridSkeleton";

export default function ProductsLoading() {
  return (
    <section aria-busy="true" aria-label="Loading products">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-start relative">
        <ProductFiltersSkeleton />

        <div className="w-full">
          <ProductSortBarSkeleton />
          <CatalogGridSkeleton count={6} />
        </div>
      </div>
    </section>
  );
}
