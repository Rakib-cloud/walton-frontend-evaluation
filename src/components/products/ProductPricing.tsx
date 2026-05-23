import type { ProductVariant } from "@/features/products/utils/pricing";
import {
  getDiscountLabel,
  getSellingPrice,
  isInStock,
} from "@/features/products/utils/pricing";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/cn";

type ProductPricingProps = {
  variant: ProductVariant;
};

export function ProductPricing({ variant }: ProductPricingProps) {
  const sellingPrice = getSellingPrice(variant);
  const discountLabel = getDiscountLabel(variant);
  const hasDiscount =
    variant.discount != null && variant.mrpPrice > sellingPrice;
  const saveAmount = hasDiscount ? variant.mrpPrice - sellingPrice : 0;

  return (
    <div className="space-y-3 rounded-md bg-[#fffff6] p-4">
      {hasDiscount ? (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-[#ec1c24] line-through">
              MSRP {formatCurrency(variant.mrpPrice)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Save: {formatCurrency(saveAmount)}
            </p>
          </div>
          <p className="text-2xl font-bold text-[#1e3a5f] sm:text-3xl">
            {formatCurrency(sellingPrice)}
          </p>
        </div>
      ) : (
        <p className="text-2xl font-bold text-[#1e3a5f] sm:text-3xl">
          {formatCurrency(sellingPrice)}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {discountLabel ? (
          <span className="rounded-md bg-[#ec1c24]/10 px-2.5 py-1 text-xs font-semibold text-[#ec1c24]">
            {discountLabel}
          </span>
        ) : null}
        <span
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-semibold",
            isInStock(variant)
              ? "bg-[#142D84]/10 text-[#142D84]"
              : "bg-amber-100 text-amber-800",
          )}
        >
          {isInStock(variant)
            ? `${variant.quantity} in stock`
            : "Out of stock"}
        </span>
      </div>
    </div>
  );
}
