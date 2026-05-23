import { cn } from "@/lib/cn";
import { CARD_SURFACE, PRODUCT_CARD_CLASS } from "@/lib/constants";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-zinc-200", className)}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <article className={cn(PRODUCT_CARD_CLASS, "pointer-events-none", className)}>
      <div className="shrink-0 px-4 pt-5">
        <Skeleton className="mx-auto aspect-[4/3] w-full max-w-[220px] rounded-none" />
      </div>

      <div className="min-h-[76px] shrink-0 space-y-2 px-4 pt-4 text-center">
        <Skeleton className="mx-auto h-3 w-4/5" />
        <Skeleton className="mx-auto h-4 w-3/5" />
      </div>

      <div className="mt-auto" style={{ backgroundColor: CARD_SURFACE }}>
        <div className="min-h-[96px] space-y-2 px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-36" />
        </div>

        <div
          className="flex items-center justify-between gap-3 border-t border-zinc-200/70 px-4 py-3"
          style={{ backgroundColor: CARD_SURFACE }}
        >
          <Skeleton className="h-9 w-9 shrink-0 rounded-full bg-white/80" />
          <Skeleton className="h-8 w-[88px] shrink-0 rounded-md bg-[#2b3d6d]" />
        </div>
      </div>
    </article>
  );
}
