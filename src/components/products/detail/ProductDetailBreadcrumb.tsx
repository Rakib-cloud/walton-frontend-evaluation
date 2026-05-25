import Link from "next/link";

type ProductDetailBreadcrumbProps = {
  productName: string;
};

export function ProductDetailBreadcrumb({ productName }: ProductDetailBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 w-full min-w-0 overflow-hidden">
      <ol className="flex items-center gap-2 w-full min-w-0 overflow-hidden">
        <li className="shrink-0">
          <Link
            href="/products"
            className="font-medium text-[#142D84] hover:underline"
          >
            Products
          </Link>
        </li>
        <li className="shrink-0" aria-hidden="true">/</li>
        <li className="truncate font-medium text-zinc-700 min-w-0 flex-1">{productName}</li>
      </ol>
    </nav>
  );
}
