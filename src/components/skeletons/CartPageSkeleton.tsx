import { Skeleton } from "@/components/ui/Skeleton";
import { PageContainer } from "@/components/ui/PageContainer";

export function CartPageSkeleton() {
  return (
    <PageContainer as="main" className="sm:py-12">
      <Skeleton className="h-10 w-56 mb-8" />

      <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-3 lg:items-start">
        {/* Items List Skeleton */}
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xs">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>

            <ul className="divide-y divide-zinc-150">
              {[1, 2].map((i) => (
                <li key={i} className="p-4 sm:p-6 flex gap-4 items-start sm:items-center">
                  {/* Image Skeleton */}
                  <Skeleton className="h-20 w-20 shrink-0 rounded-xl" />

                  {/* Right/Content Side */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">
                    {/* Description Skeleton */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-24" />
                    </div>

                    {/* Quantity & Actions Skeleton */}
                    <div className="flex items-center justify-between sm:justify-start gap-4 mt-2 sm:mt-0 w-full sm:w-auto">
                      <Skeleton className="h-8 w-24 rounded-lg" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>

                    {/* Total Price Skeleton */}
                    <div className="hidden sm:block text-right min-w-[100px] pl-4 space-y-1">
                      <Skeleton className="h-5 w-20 ml-auto" />
                      <Skeleton className="h-3.5 w-12 ml-auto" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Skeleton className="h-5 w-36" />
        </div>

        {/* Order Summary Skeleton */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs lg:col-span-1 space-y-6">
          <Skeleton className="h-6 w-36 pb-2" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="border-t border-zinc-150 pt-4 flex items-center justify-between">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </PageContainer>
  );
}
