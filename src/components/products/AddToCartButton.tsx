"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/cart/store/cart-store";
import { cn } from "@/lib/cn";

type AddToCartButtonProps = {
  uid: string;
  name: string;
  imageUrl?: string | null;
  posItemCode: string;
  unitPrice: number;
  disabled?: boolean;
  className?: string;
  label?: string;
  variant?: "default" | "buyNow";
};

export function AddToCartButton({
  uid,
  name,
  imageUrl,
  posItemCode,
  unitPrice,
  disabled = false,
  className,
  label = "Add to Cart",
  variant = "default",
}: AddToCartButtonProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [isPending, startTransition] = useTransition();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;

    startTransition(async () => {
      addItem({
        uid,
        name,
        imageUrl: imageUrl ?? undefined,
        posItemCode,
        unitPrice,
      });
      router.push("/cart");
    });
  };

  return (
    <button
      type="button"
      disabled={disabled || isPending}
      onClick={handleClick}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variant === "buyNow"
          ? "bg-[#2b3d6d] text-white hover:bg-[#39a9bd]"
          : "bg-zinc-900 text-white hover:bg-zinc-800",
        className,
      )}
      aria-label={disabled ? "Out of stock" : `${label} ${name}`}
    >
      {disabled ? "Out of Stock" : isPending ? "Adding..." : label}
    </button>
  );
}
