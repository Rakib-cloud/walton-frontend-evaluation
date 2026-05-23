"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useCartHydration } from "@/features/cart/hooks/use-cart-hydration";

export function CartLauncher() {
  useCartHydration();
  const [hasMounted, setHasMounted] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setHasMounted(true);
  }, []);

  return (
    <Link
      href="/cart"
      className="relative rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 inline-flex items-center"
      aria-label={`View cart with ${hasMounted ? totalItems : 0} items`}
    >
      Cart
      {hasMounted && totalItems > 0 ? (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-xs text-white">
          {totalItems}
        </span>
      ) : null}
    </Link>
  );
}
