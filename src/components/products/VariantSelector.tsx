"use client";

import type { ProductVariant } from "@/features/products/utils/pricing";
import { isInStock } from "@/features/products/utils/pricing";
import { cn } from "@/lib/cn";

type VariantSelectorProps = {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function VariantSelector({
  variants,
  selectedIndex,
  onSelect,
}: VariantSelectorProps) {
  if (variants.length <= 1) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-zinc-700">Select variant</p>
      <ul className="flex flex-wrap gap-2">
        {variants.map((variant, index) => {
          const label = variant.posItemCode || `Variant ${index + 1}`;
          const inStock = isInStock(variant);

          return (
            <li key={`${variant.posItemCode}-${index}`}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                disabled={!inStock}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm transition-colors",
                  index === selectedIndex
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 bg-white text-zinc-800 hover:border-zinc-500",
                  !inStock && "cursor-not-allowed opacity-50",
                )}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
