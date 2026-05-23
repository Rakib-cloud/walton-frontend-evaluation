"use client";

import { useEffect } from "react";
import { useCartStore } from "@/features/cart/store/cart-store";

export function useCartHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
}
