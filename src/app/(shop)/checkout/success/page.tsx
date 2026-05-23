"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { CheckIcon, TruckIcon } from "@/components/ui/Icons";

type OrderDetails = {
  orderId: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  paymentMethod: string;
  totalAmount: number;
  itemsCount: number;
};

export default function CheckoutSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setHasMounted(true);
    const data = sessionStorage.getItem("walton-latest-order");
    if (data) {
      try {
        setOrderDetails(JSON.parse(data));
      } catch (e) {
        console.error("Failed to parse order details", e);
      }
    }
  }, []);

  if (!hasMounted) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="h-96 w-full animate-pulse rounded-lg bg-zinc-200" />
      </main>
    );
  }

  // Fallback values if direct navigation occurred
  const displayOrder = orderDetails ?? {
    orderId: "WP-00000000",
    fullName: "Valued Customer",
    phone: "N/A",
    email: "N/A",
    address: "Provided Address",
    city: "N/A",
    paymentMethod: "Cash on Delivery",
    totalAmount: 0,
    itemsCount: 0,
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center mb-8">
        {/* Animated Checkmark Circle */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-500 mb-4 border-2 border-green-200 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <CheckIcon className="h-9 w-9" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          Order Confirmed!
        </h1>
        <p className="text-sm text-zinc-500 mt-2 max-w-md">
          Thank you for shopping with Walton Plaza. Your order has been placed successfully and is now being processed.
        </p>
      </div>

      <div className="space-y-6">
        {/* Card 1: Order Details */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wider border-b border-zinc-100 pb-2">
            Order Information
          </h2>

          <div className="grid gap-y-3 sm:grid-cols-2 sm:gap-x-4 text-sm">
            <div>
              <span className="text-zinc-500 block">Order ID</span>
              <span className="font-bold text-[#142D84] text-base">{displayOrder.orderId}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Payment Method</span>
              <span className="font-semibold text-zinc-800">{displayOrder.paymentMethod}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Items Placed</span>
              <span className="font-semibold text-zinc-800">
                {displayOrder.itemsCount} {displayOrder.itemsCount === 1 ? "item" : "items"}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block">Order Total</span>
              <span className="font-bold text-walton-blue text-base">
                {displayOrder.totalAmount > 0 ? formatCurrency(displayOrder.totalAmount) : "Paid"}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Shipping Details */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wider border-b border-zinc-100 pb-2">
            Shipping & Contact Details
          </h2>

          <div className="grid gap-y-3 sm:grid-cols-2 sm:gap-x-4 text-sm">
            <div className="sm:col-span-2">
              <span className="text-zinc-500 block">Customer Name</span>
              <span className="font-semibold text-zinc-900">{displayOrder.fullName}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Phone Number</span>
              <span className="font-semibold text-zinc-800">{displayOrder.phone}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Email Address</span>
              <span className="font-semibold text-zinc-800">{displayOrder.email}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-zinc-500 block">Delivery Address</span>
              <span className="font-semibold text-zinc-800">
                {displayOrder.address}, {displayOrder.city}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="rounded-xl bg-walton-blue/5 border border-walton-blue/15 p-4 flex gap-3 items-start">
          <TruckIcon className="h-6 w-6 text-walton-blue shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-[#1e3a5f]">Estimated Delivery Timeline</h3>
            <p className="text-xs text-zinc-600 mt-1">
              Your package will arrive in **2-3 business days**. You will receive a phone confirmation call from our plaza representative before delivery.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/products"
            className="flex-1 flex h-11 items-center justify-center rounded-xl bg-walton-blue text-sm font-bold text-white transition-all hover:bg-walton-teal shadow-xs hover:shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
