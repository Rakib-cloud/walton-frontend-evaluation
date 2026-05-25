"use client";

import { useTransition, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/cart/store/cart-store";
import { cn } from "@/lib/cn";
import { toast } from "sonner";

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
  quantity?: number;
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
  quantity = 1,
}: AddToCartButtonProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [isPending, startTransition] = useTransition();
  const [optimisticAdding, setOptimisticAdding] = useOptimistic(
    false,
    (state, nextValue: boolean) => nextValue
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;

    startTransition(async () => {
      setOptimisticAdding(true);
      addItem({
        uid,
        name,
        imageUrl: imageUrl ?? undefined,
        posItemCode,
        unitPrice,
      }, quantity);
      
      // Simulate minor visual confirmation transition delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      toast.success(`${name} added to cart!`);
      if (variant === "buyNow") {
        router.push("/cart");
      }
    });
  };

  const isCurrentAdding = isPending || optimisticAdding;

  return (
    <button
      type="button"
      disabled={disabled || isCurrentAdding}
      onClick={handleClick}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer",
        variant === "buyNow"
          ? "bg-[#2b3d6d] text-white hover:bg-[#39a9bd]"
          : "bg-zinc-900 text-white hover:bg-zinc-800",
        className,
      )}
      aria-label={disabled ? "Out of stock" : `${label} ${name}`}
    >
      {disabled ? "Out of Stock" : isCurrentAdding ? "Adding..." : label}
    </button>
  );
}
