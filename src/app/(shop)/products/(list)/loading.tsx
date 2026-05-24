import {
  ProductFiltersSkeleton,
  ProductSortBarSkeleton,
} from "@/components/products/ProductFiltersSkeleton";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <section aria-busy="true" aria-label="Loading products">
      <div className="grid gap-6 lg:h-[calc(100dvh-8rem)] lg:min-h-[28rem] lg:grid-cols-[280px_1fr] lg:items-start">
        <ProductFiltersSkeleton />

        <div className="lg:min-h-0 lg:h-full lg:overflow-y-auto scrollbar-none">
          <ProductSortBarSkeleton />

          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <li key={index} className="flex w-full">
                <ProductCardSkeleton className="w-full" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
