export default function ProductDetailLoading() {
  return (
    <article aria-busy="true" aria-label="Loading product" className="space-y-10">
      <div className="h-4 w-40 animate-pulse rounded bg-zinc-200" />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="aspect-square min-h-[280px] animate-pulse rounded-md bg-zinc-200" />
        <div className="space-y-4 rounded-md border border-zinc-200 bg-white p-6">
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-200" />
          <div className="h-8 w-full animate-pulse rounded bg-zinc-200" />
          <div className="h-24 animate-pulse rounded-md bg-zinc-100" />
          <div className="h-11 w-full animate-pulse rounded-md bg-zinc-200" />
        </div>
      </div>

      <div className="h-64 animate-pulse rounded-md bg-zinc-200" />
    </article>
  );
}
