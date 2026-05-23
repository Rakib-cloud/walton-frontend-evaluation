import { FilterSectionSkeleton } from "@/components/products/FilterSection";
import { PriceRangeFilterSkeleton } from "@/components/products/PriceRangeFilter";
import { Skeleton } from "@/components/ui/Skeleton";

export function ProductFiltersSkeleton() {
  return (
    <aside className="space-y-3 lg:sticky lg:top-0 lg:max-h-full lg:self-start lg:overflow-y-auto scrollbar-none">
      <div className="flex items-center justify-between px-1">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-3 w-14" />
      </div>

      <FilterSectionSkeleton rows={2} />
      <FilterSectionSkeleton rows={3} />
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3.5">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-4 rounded-sm" />
        </div>
        <div className="border-t border-zinc-100 px-4 pb-4 pt-3">
          <PriceRangeFilterSkeleton />
        </div>
      </div>
      <FilterSectionSkeleton rows={3} />
    </aside>
  );
}

export function ProductSortBarSkeleton() {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-sm" />
        <Skeleton className="h-4 w-44" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-sm" />
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-9 w-[180px] rounded-md" />
      </div>
    </div>
  );
}
