"use client";

import { useEffect, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useCartHydration } from "@/features/cart/hooks/use-cart-hydration";
import { formatCurrency } from "@/lib/format";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/lib/constants";
import { ProductImage } from "@/components/ui/ProductImage";
import { InputField } from "@/components/ui/InputField";
import {
  MapPinIcon,
  CreditCardIcon,
  BanknotesIcon,
} from "@/components/ui/Icons";
import { CheckoutPageSkeleton } from "@/components/skeletons/CheckoutPageSkeleton";
import { PageContainer } from "@/components/ui/PageContainer";
import { toast } from "sonner";

type FormErrors = {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
};

export default function CheckoutPage() {
  useCartHydration();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const clearCart = useCartStore((state) => state.clearCart);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // default cash on delivery
  const [formState, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const fullNameVal = formData.get("fullName") as string;
      const phoneVal = formData.get("phone") as string;
      const emailVal = formData.get("email") as string;
      const addressVal = formData.get("address") as string;
      const cityVal = formData.get("city") as string;

      const newErrors: FormErrors = {};

      if (!fullNameVal?.trim()) newErrors.fullName = "Full Name is required";
      if (!phoneVal?.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[0-9+-\s]{11,15}$/.test(phoneVal.trim())) {
        newErrors.phone = "Please enter a valid 11-15 digit phone number";
      }
      if (!addressVal?.trim()) newErrors.address = "Shipping address is required";
      if (!cityVal?.trim()) newErrors.city = "City is required";
      
      if (emailVal?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal.trim())) {
        newErrors.email = "Please enter a valid email address";
      }

      if (Object.keys(newErrors).length > 0) {
        return { errors: newErrors };
      }

      // Simulate ordering delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const orderId = `WP-${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      const orderDetails = {
        orderId,
        fullName: fullNameVal,
        phone: phoneVal,
        email: emailVal || "N/A",
        address: addressVal,
        city: cityVal,
        paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Digital Payment",
        totalAmount: orderTotal,
        itemsCount: items.reduce((sum, item) => sum + item.quantity, 0),
      };
      
      sessionStorage.setItem("walton-latest-order", JSON.stringify(orderDetails));
      clearCart();
      toast.success("Order placed successfully! Redirecting...");
      router.push("/checkout/success");
      return { success: true };
    },
    null
  );

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <CheckoutPageSkeleton />;
  }

  // Redirect to products if checkout accessed with empty cart
  if (items.length === 0 && !isPending) {
    return (
      <PageContainer as="main" className="py-12 text-center">
        <h2 className="text-xl font-bold text-zinc-900 mb-2">No items to checkout</h2>
        <p className="text-zinc-500 mb-6">Your shopping cart is currently empty.</p>
        <Link href="/products" className="inline-flex h-11 items-center justify-center rounded-lg bg-walton-blue px-6 text-sm font-bold text-white transition-all hover:bg-walton-teal">
          Return to Shop
        </Link>
      </PageContainer>
    );
  }

  const shippingCost = 100; // Flat BDT 100 shipping fee
  const orderTotal = subtotal + shippingCost;

  // Action is handled by useActionState

  return (
    <PageContainer as="main" className="sm:py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl mb-8">
        Checkout
      </h1>

      <form action={formAction} className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-3 lg:items-start">
        {/* Shipping Form & Payment Method (Left 2 cols) */}
        <div className="space-y-6 lg:col-span-2">
          {/* Section 1: Shipping details */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-zinc-100 pb-3 flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-walton-teal" />
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                id="fullName"
                label="Full Name"
                value={fullName}
                onChange={setFullName}
                error={formState?.errors?.fullName}
                placeholder="e.g. John Doe"
                required
                className="sm:col-span-2"
              />

              <InputField
                id="phone"
                label="Phone Number"
                value={phone}
                onChange={setPhone}
                error={formState?.errors?.phone}
                placeholder="e.g. 01712345678"
                required
              />

              <InputField
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
                error={formState?.errors?.email}
                placeholder="e.g. name@example.com"
              />

              <InputField
                id="address"
                label="Street Address"
                value={address}
                onChange={setAddress}
                error={formState?.errors?.address}
                placeholder="House No, Road No, Area details..."
                textarea
                required
                className="sm:col-span-2"
              />

              <InputField
                id="city"
                label="City / District"
                value={city}
                onChange={setCity}
                error={formState?.errors?.city}
                placeholder="e.g. Dhaka"
                required
                className="sm:col-span-2"
              />
            </div>
          </div>

          {/* Section 2: Payment options */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-zinc-100 pb-3 flex items-center gap-2">
              <CreditCardIcon className="h-5 w-5 text-walton-teal" />
              Payment Method
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Cash On Delivery Option */}
              <label className={`relative flex items-start gap-3 sm:gap-4 rounded-xl border p-3 sm:p-4 cursor-pointer transition-all ${
                paymentMethod === "cod"
                  ? "border-walton-blue bg-walton-blue/5 ring-2 ring-walton-blue/10"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 h-4 w-4 border-zinc-300 text-walton-blue focus:ring-walton-blue shrink-0"
                />
                <div className="flex-1">
                  <span className="block text-sm font-bold text-zinc-900">Cash on Delivery (COD)</span>
                  <span className="block text-xs text-zinc-500 mt-1">
                    Pay with cash when your products are delivered right to your doorstep.
                  </span>
                </div>
                <div className="shrink-0 p-1.5 rounded-lg bg-green-50 text-green-600">
                  <BanknotesIcon className="h-5 w-5" />
                </div>
              </label>

              {/* Disabled Digital Payment Option (Mock only) */}
              <div className="relative flex items-start gap-3 sm:gap-4 rounded-xl border border-zinc-200 p-3 sm:p-4 opacity-50 cursor-not-allowed">
                <input
                  type="radio"
                  name="payment"
                  disabled
                  className="mt-1 h-4 w-4 border-zinc-300 text-zinc-300 shrink-0"
                />
                <div className="flex-1">
                  <span className="block text-sm font-bold text-zinc-400">Card / Mobile Banking</span>
                  <span className="block text-xs text-zinc-400 mt-1">
                    Pay securely using Visa, MasterCard, bKash, Rocket, or Nagad (Currently Offline).
                  </span>
                </div>
                <div className="shrink-0 p-1.5 rounded-lg bg-zinc-50 text-zinc-400">
                  <CreditCardIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order details panel (Right 1 col) */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs lg:col-span-1 space-y-6">
          <h2 className="text-lg font-bold text-[#1e3a5f] border-b border-zinc-100 pb-4">
            Items in Order
          </h2>

          {/* List items mini */}
          <ul className="divide-y divide-zinc-100 max-h-56 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.posItemCode} className="py-3 flex gap-3 items-center">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-zinc-200 bg-white p-0.5">
                  <ProductImage
                    src={item.imageUrl ?? PRODUCT_PLACEHOLDER_IMAGE}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-zinc-800 truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    Qty: {item.quantity} × {formatCurrency(item.unitPrice)}
                  </p>
                </div>
                <p className="text-xs font-bold text-[#1e3a5f] shrink-0 pl-2">
                  {formatCurrency(item.unitPrice * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="border-t border-zinc-150 pt-4 space-y-3.5">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Subtotal</span>
              <span className="font-semibold text-zinc-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Shipping Fee</span>
              <span className="font-semibold text-zinc-900">{formatCurrency(shippingCost)}</span>
            </div>

            <div className="border-t border-zinc-100 pt-3 flex items-center justify-between">
              <span className="font-bold text-zinc-800 text-sm">Total</span>
              <span className="text-lg font-extrabold text-walton-blue">
                {formatCurrency(orderTotal)}
              </span>
            </div>
          </div>

          <SubmitOrderButton />
        </div>
      </form>
    </PageContainer>
  );
}

function SubmitOrderButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex h-12 items-center justify-center rounded-xl bg-walton-blue text-sm font-bold text-white transition-all hover:bg-walton-teal shadow-xs hover:shadow-md active:scale-99 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
    >
      {pending ? "Placing Order..." : "Confirm & Place Order"}
    </button>
  );
}
