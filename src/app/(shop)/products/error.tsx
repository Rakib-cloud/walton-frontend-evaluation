"use client";

type ProductsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProductsError({ error, reset }: ProductsErrorProps) {
  return (
    <section className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="text-lg font-semibold text-red-800">
        Unable to load products
      </h2>
      <p className="mt-2 text-sm text-red-600">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
      >
        Try again
      </button>
    </section>
  );
}
