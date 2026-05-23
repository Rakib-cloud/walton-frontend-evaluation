"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useCartHydration } from "@/features/cart/hooks/use-cart-hydration";

const CartDrawer = dynamic(
  () =>
    import("@/features/cart/components/CartDrawer").then(
      (module) => module.CartDrawer,
    ),
  { ssr: false },
);

export function CartLauncher() {
  useCartHydration();
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const subtotal = useCartStore((state) => state.subtotal());

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        aria-label={`Open cart with ${totalItems} items`}
      >
        Cart
        {totalItems > 0 ? (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-xs text-white">
            {totalItems}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <CartDrawer subtotal={subtotal} onClose={() => setIsOpen(false)} />
      ) : null}
    </>
  );
}
