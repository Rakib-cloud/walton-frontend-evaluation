import { Skeleton } from "@/components/ui/Skeleton";

export function CheckoutSuccessSkeleton() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <Skeleton className="h-96 w-full" />
    </main>
  );
}
