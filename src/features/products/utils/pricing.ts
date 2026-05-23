export type DiscountType = "flat" | "percentage";

export type ProductDiscount = {
  amount: number;
  value: number;
  type: DiscountType;
};

export type ProductVariant = {
  mrpPrice: number;
  ebsItemCode?: string | null;
  posItemCode?: string | null;
  quantity: number;
  discount?: ProductDiscount | null;
};

export function getSellingPrice(variant: ProductVariant): number {
  if (variant.discount?.value != null) {
    return variant.discount.value;
  }

  const { mrpPrice, discount } = variant;

  if (!discount) {
    return mrpPrice;
  }

  if (discount.type === "flat") {
    return mrpPrice - discount.amount;
  }

  return mrpPrice - (mrpPrice * discount.amount) / 100;
}

export function getDiscountLabel(variant: ProductVariant): string | null {
  const { discount } = variant;
  if (!discount) return null;

  if (discount.type === "flat") {
    return `Save ৳${discount.amount.toLocaleString()}`;
  }

  return `${discount.amount}% OFF`;
}

export function isInStock(variant: ProductVariant): boolean {
  return variant.quantity > 0;
}

export function getPrimaryVariant(
  variants: ProductVariant[],
): ProductVariant | undefined {
  return variants.find(isInStock) ?? variants[0];
}
