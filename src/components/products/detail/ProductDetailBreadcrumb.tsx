import Link from "next/link";

type ProductDetailBreadcrumbProps = {
  productName: string;
};

export function ProductDetailBreadcrumb({ productName }: ProductDetailBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            href="/products"
            className="font-medium text-[#142D84] hover:underline"
          >
            Products
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="line-clamp-1 font-medium text-zinc-700">{productName}</li>
      </ol>
    </nav>
  );
}
