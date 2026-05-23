export default function ProductDetailLoading() {
  return (
    <article aria-busy="true" aria-label="Loading product">
      <div className="h-9 w-2/3 max-w-lg animate-pulse rounded-lg bg-zinc-200" />
      <div className="mt-3 h-5 w-32 animate-pulse rounded bg-zinc-200" />
      <div className="mt-8 h-48 animate-pulse rounded-xl bg-zinc-200" />
    </article>
  );
}
