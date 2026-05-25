import { Skeleton } from "@/components/ui/Skeleton";

export function ProductDetailSkeleton() {
  return (
    <article aria-busy="true" aria-label="Loading product" className="space-y-10">
      <Skeleton className="h-4 w-40" />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Skeleton className="aspect-square min-h-[280px]" />
        <div className="space-y-4 rounded-md border border-zinc-200 bg-white p-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-24 w-full bg-zinc-100" />
          <Skeleton className="h-11 w-full" />
        </div>
      </div>

      <Skeleton className="h-64 w-full" />
    </article>
  );
}
