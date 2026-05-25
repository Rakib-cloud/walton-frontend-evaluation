import { ProductCardSkeleton } from "@/components/ui/Skeleton";

type CatalogGridSkeletonProps = {
  count?: number;
};

export function CatalogGridSkeleton({ count = 6 }: CatalogGridSkeletonProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index} className="flex w-full">
          <ProductCardSkeleton className="w-full" />
        </li>
      ))}
    </ul>
  );
}
