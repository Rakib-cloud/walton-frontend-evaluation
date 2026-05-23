import { Badge } from "@/components/ui/Badge";
import type { ProductVariant } from "@/features/products/utils/pricing";
import {
  getDiscountLabel,
  getSellingPrice,
  isInStock,
} from "@/features/products/utils/pricing";
import { formatCurrency } from "@/lib/format";

type ProductPricingProps = {
  variant: ProductVariant;
};

export function ProductPricing({ variant }: ProductPricingProps) {
  const sellingPrice = getSellingPrice(variant);
  const discountLabel = getDiscountLabel(variant);
  const hasDiscount =
    variant.discount != null && variant.mrpPrice > sellingPrice;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-3xl font-bold text-zinc-900">
          {formatCurrency(sellingPrice)}
        </span>
        {hasDiscount ? (
          <span className="text-lg text-zinc-400 line-through">
            {formatCurrency(variant.mrpPrice)}
          </span>
        ) : null}
        {discountLabel ? <Badge variant="danger">{discountLabel}</Badge> : null}
      </div>

      <Badge variant={isInStock(variant) ? "success" : "warning"}>
        {isInStock(variant)
          ? `${variant.quantity} in stock`
          : "Out of stock"}
      </Badge>
    </div>
  );
}
