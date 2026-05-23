"use client";

import Image from "next/image";
import { useCartStore } from "@/features/cart/store/cart-store";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/constants";

type CartDrawerProps = {
  subtotal: number;
  onClose: () => void;
};

export function CartDrawer({ subtotal, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart overlay"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <header className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-zinc-500 hover:text-zinc-800"
          >
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-zinc-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.posItemCode}
                  className="flex gap-3 rounded-lg border border-zinc-200 p-3"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-md bg-zinc-100">
                    <Image
                      src={item.imageUrl ?? PRODUCT_PLACEHOLDER_IMAGE}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-zinc-500">
                      {formatCurrency(item.unitPrice)}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.posItemCode, item.quantity - 1)
                        }
                        className="h-7 w-7 rounded border border-zinc-300 text-sm"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="min-w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.posItemCode, item.quantity + 1)
                        }
                        className="h-7 w-7 rounded border border-zinc-300 text-sm"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.posItemCode)}
                        className="ml-auto text-xs text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-zinc-200 px-5 py-4">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-zinc-600">Subtotal</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={clearCart}
              disabled={items.length === 0}
            >
              Clear
            </Button>
            <Button className="flex-1" disabled={items.length === 0}>
              Checkout
            </Button>
          </div>
        </footer>
      </aside>
    </div>
  );
}
