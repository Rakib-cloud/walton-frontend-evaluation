import Image from "next/image";
import Link from "next/link";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/constants";
import { formatCurrency } from "@/lib/format";

type RelatedProductsCardProps = {
  relatedCatalogProducts: any[];
};

export function RelatedProductsCard({ relatedCatalogProducts }: RelatedProductsCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs space-y-4">
      <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1e3a5f] border-b border-zinc-100 pb-3">
        Related Products
      </h4>

      {relatedCatalogProducts.length > 0 ? (
        <ul className="divide-y divide-zinc-100">
          {relatedCatalogProducts.map((p) => {
            const discount = p.primaryVariant?.discount;
            const hasDiscount = discount && p.primaryVariant.mrpPrice > p.sellingPrice;
            return (
              <li key={p.uid} className="py-3 first:pt-0 last:pb-0 flex gap-3 items-center">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-zinc-100 bg-white p-1">
                  <Image
                    src={p.imageUrl ?? PRODUCT_PLACEHOLDER_IMAGE}
                    alt={p.name}
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${p.uid}`} className="text-xs font-bold text-[#1e3a5f] hover:underline line-clamp-1 block">
                    {p.name}
                  </Link>
                  <p className="text-[10px] font-semibold text-zinc-400 mt-0.5 truncate uppercase">
                    {p.modelCode}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                    <span className="text-xs font-extrabold text-[#ec1c24]">
                      {formatCurrency(p.sellingPrice)}
                    </span>
                    {hasDiscount ? (
                      <span className="text-[10px] text-zinc-400 line-through">
                        {formatCurrency(p.primaryVariant.mrpPrice)}
                      </span>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-xs text-zinc-400">No related products found.</p>
      )}
    </div>
  );
}
