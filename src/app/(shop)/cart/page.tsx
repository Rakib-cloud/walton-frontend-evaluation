"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useCartHydration } from "@/features/cart/hooks/use-cart-hydration";
import { formatCurrency } from "@/lib/format";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/constants";
import { ProductImage } from "@/components/ui/ProductImage";
import {
  ShoppingCartIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@/components/ui/Icons";
import { CartPageSkeleton } from "@/components/skeletons/CartPageSkeleton";
import { PageContainer } from "@/components/ui/PageContainer";

export default function CartPage() {
  useCartHydration();
  const [hasMounted, setHasMounted] = useState(false);

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.subtotal());

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <CartPageSkeleton />;
  }


  const shippingCost = items.length > 0 ? 100 : 0; // Flat 100 BDT shipping fee
  const orderTotal = subtotal + shippingCost;

  return (
    <PageContainer as="main" className="sm:py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl mb-8">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center shadow-xs">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 mb-4">
            <ShoppingCartIcon className="h-8 w-8 text-zinc-400" />
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-1">Your cart is empty</h2>
          <p className="text-sm text-zinc-500 mb-6 max-w-sm">
            It looks like you haven&apos;t added any products to your cart yet. Let&apos;s find some amazing items!
          </p>
          <Link
            href="/products"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-walton-blue px-6 text-sm font-bold text-white transition-all hover:bg-walton-teal shadow-xs hover:shadow-md"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-3 lg:items-start">
          {/* Items List */}
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-xs overflow-hidden">
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                <span className="font-semibold text-zinc-800 text-sm">
                  {items.length} {items.length === 1 ? "Item" : "Items"} in your cart
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>

              <ul className="divide-y divide-zinc-150">
                {items.map((item) => (
                  <li key={item.posItemCode} className="p-4 sm:p-6 flex gap-4 items-start sm:items-center">
                    {/* Image */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-white p-2">
                      <ProductImage
                        src={item.imageUrl ?? PRODUCT_PLACEHOLDER_IMAGE}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>

                    {/* Right/Content Side */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">
                      {/* Description */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[#1e3a5f] hover:text-walton-blue line-clamp-2 sm:truncate">
                          <Link href={`/products/${item.uid}`}>
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Code: {item.posItemCode}
                        </p>
                        <div className="flex items-center gap-2 mt-1 sm:hidden">
                          <span className="text-xs text-zinc-500">{formatCurrency(item.unitPrice)} each</span>
                        </div>
                      </div>

                      {/* Controls and Prices */}
                      <div className="flex items-center justify-between sm:justify-start gap-4 mt-2 sm:mt-0 w-full sm:w-auto">
                        {/* Quantity Control */}
                        <div className="flex items-center rounded-lg border border-zinc-300 bg-zinc-50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.posItemCode, item.quantity - 1)}
                            className="h-8 w-8 flex items-center justify-center text-zinc-600 hover:text-zinc-950 font-medium transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="min-w-8 text-center text-sm font-semibold text-zinc-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.posItemCode, item.quantity + 1)}
                            className="h-8 w-8 flex items-center justify-center text-zinc-600 hover:text-zinc-950 font-medium transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Price block for mobile, inline with controls */}
                        <div className="text-right sm:hidden">
                          <p className="text-sm font-bold text-[#1e3a5f]">
                            {formatCurrency(item.unitPrice * item.quantity)}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.posItemCode)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors rounded-md hover:bg-zinc-50 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Total Price for Desktop */}
                      <div className="hidden sm:block text-right min-w-[100px] pl-4">
                        <p className="text-sm font-bold text-[#1e3a5f]">
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </p>
                        <p className="text-[11px] text-zinc-400">
                          {formatCurrency(item.unitPrice)} each
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-walton-blue hover:text-walton-teal transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs lg:col-span-1 space-y-6">
            <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-zinc-100 pb-4">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>Shipping Fee</span>
                <span className="font-semibold text-zinc-900">{formatCurrency(shippingCost)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>Tax / VAT</span>
                <span className="font-semibold text-zinc-900">Included</span>
              </div>

              <div className="border-t border-zinc-150 pt-4 flex items-center justify-between">
                <span className="font-bold text-zinc-800">Total</span>
                <span className="text-xl font-extrabold text-walton-blue">
                  {formatCurrency(orderTotal)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full flex h-12 items-center justify-center rounded-xl bg-walton-blue text-sm font-bold text-white transition-all hover:bg-walton-teal shadow-xs hover:shadow-md active:scale-99"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
