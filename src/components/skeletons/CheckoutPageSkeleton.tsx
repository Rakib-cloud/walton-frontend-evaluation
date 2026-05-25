import { Skeleton } from "@/components/ui/Skeleton";
import { PageContainer } from "@/components/ui/PageContainer";

export function CheckoutPageSkeleton() {
  return (
    <PageContainer as="main" className="sm:py-12">
      <Skeleton className="h-10 w-40 mb-8" />

      <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-3 lg:items-start">
        {/* Shipping Form & Payment Method (Left 2 cols) */}
        <div className="space-y-6 lg:col-span-2">
          {/* Section 1: Shipping Information Card */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs space-y-6">
            <div className="border-b border-zinc-100 pb-3">
              <Skeleton className="h-6 w-52" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-20 w-full rounded-lg" />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
            </div>
          </div>

          {/* Section 2: Payment options */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs space-y-4">
            <div className="border-b border-zinc-100 pb-3">
              <Skeleton className="h-6 w-44" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Skeleton className="h-28 w-full rounded-xl" />
              <Skeleton className="h-28 w-full rounded-xl" />
            </div>
          </div>
        </div>

        {/* Order details panel (Right 1 col) */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs lg:col-span-1 space-y-6">
          <div className="border-b border-zinc-100 pb-4">
            <Skeleton className="h-6 w-36" />
          </div>

          {/* List items mini */}
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="py-1 flex gap-3 items-center">
                <Skeleton className="h-10 w-10 shrink-0 rounded-md" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-14 shrink-0" />
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-150 pt-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="border-t border-zinc-100 pt-3 flex items-center justify-between">
              <Skeleton className="h-4.5 w-12" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </PageContainer>
  );
}
