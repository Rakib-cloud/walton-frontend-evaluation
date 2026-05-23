import type { ProductCardFieldsFragment } from "@/graphql/generated/graphql";
import type { DiscountType, ProductVariant } from "@/features/products/utils/pricing";
import {
  getPrimaryVariant,
  getSellingPrice,
  isInStock,
} from "@/features/products/utils/pricing";

export type CatalogProduct = {
  uid: string;
  name: string;
  modelCode: string;
  imageUrl: string | null;
  category: string | null;
  brand: string | null;
  rating: number | null;
  variants: ProductVariant[];
  primaryVariant: ProductVariant;
  sellingPrice: number;
  inStock: boolean;
};

type GraphQLVariant = {
  mrpPrice?: number | null;
  posItemCode?: string | null;
  quantity?: number | null;
  discount?: {
    amount?: number | null;
    value?: number | null;
    type?: string | null;
  } | null;
};

export function normalizeVariant(variant: GraphQLVariant): ProductVariant {
  return {
    mrpPrice: variant.mrpPrice ?? 0,
    posItemCode: variant.posItemCode ?? "",
    quantity: variant.quantity ?? 0,
    discount: variant.discount
      ? {
          amount: variant.discount.amount ?? 0,
          value: variant.discount.value ?? 0,
          type: (variant.discount.type === "percentage"
            ? "percentage"
            : "flat") as DiscountType,
        }
      : null,
  };
}

export function getAttributeValue(
  attributes: ProductCardFieldsFragment["productAttributes"],
  labelMatchers: RegExp[],
): string | null {
  if (!attributes?.length) return null;

  const match = attributes.find((attr) =>
    labelMatchers.some((matcher) =>
      attr.enLabel ? matcher.test(attr.enLabel) : false,
    ),
  );

  return match?.values[0]?.enName ?? null;
}

export function toCatalogProduct(
  product: ProductCardFieldsFragment,
): CatalogProduct | null {
  if (!product.variants.length) return null;

  const variants = product.variants.map(normalizeVariant);
  const primaryVariant = getPrimaryVariant(variants);

  if (!primaryVariant?.posItemCode) return null;

  return {
    uid: product.uid,
    name: product.enName ?? "Unnamed product",
    modelCode: primaryVariant.posItemCode || product.uid,
    imageUrl: product.images[0]?.url ?? null,
    category: getAttributeValue(product.productAttributes, [
      /category/i,
      /type/i,
    ]),
    brand: getAttributeValue(product.productAttributes, [
      /brand/i,
      /manufacturer/i,
    ]),
    rating: parseRating(
      getAttributeValue(product.productAttributes, [/rating/i, /star/i]),
    ),
    variants,
    primaryVariant,
    sellingPrice: getSellingPrice(primaryVariant),
    inStock: isInStock(primaryVariant),
  };
}

function parseRating(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number.parseFloat(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

export function extractCategories(products: CatalogProduct[]): string[] {
  const categories = new Set<string>();

  for (const product of products) {
    if (product.category) categories.add(product.category);
  }

  return [...categories].sort((a, b) => a.localeCompare(b));
}

export function extractBrands(products: CatalogProduct[]): string[] {
  const brands = new Set<string>();

  for (const product of products) {
    if (product.brand) brands.add(product.brand);
  }

  if (brands.size === 0) {
    brands.add("Walton");
  }

  return [...brands].sort((a, b) => a.localeCompare(b));
}

export function getPriceRange(products: CatalogProduct[]): {
  min: number;
  max: number;
} {
  if (products.length === 0) {
    return { min: 0, max: 100000 };
  }

  const prices = products.map((product) => product.sellingPrice);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}
