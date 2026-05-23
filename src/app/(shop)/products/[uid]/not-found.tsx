import Link from "next/link";

export default function ProductNotFound() {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-8 text-center">
      <h2 className="text-xl font-semibold">Product not found</h2>
      <p className="mt-2 text-zinc-600">
        The product you are looking for does not exist or is no longer available.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        Back to products
      </Link>
    </section>
  );
}
