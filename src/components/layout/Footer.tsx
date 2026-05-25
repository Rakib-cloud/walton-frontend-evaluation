"use client";

import Image from "next/image";
import Link from "next/link";
import { WaltonPlazaLogo } from "./WaltonPlazaLogo";

export function Footer() {
  return (
    <footer className="mt-12 bg-[#e2f0f4] border-t border-zinc-200 text-zinc-800">
      {/* Top Footer Columns */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-8 sm:gap-8">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4 col-span-2 sm:col-span-2 md:col-span-2 flex flex-col items-center text-center sm:items-start sm:text-left">
            <WaltonPlazaLogo className="h-7 w-auto" />
            
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide">
                Customer Service helpline
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Call us at 16267 (Charge Applicable) <br />
                or 08 000016267 (Toll Free)
              </p>
              <p className="text-xs text-zinc-500 italic">
                We are available from 07:00 am to 11:00 pm
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[#1e3a5f] uppercase tracking-wider">
                Stay in touch with us
              </h4>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#142d84] text-white hover:bg-walton-teal transition-colors shadow-xs"
                  aria-label="Facebook"
                >
                  <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1H13c-2.8 0-5 2.2-5 5v2z" />
                  </svg>
                </a>
                
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#142d84] text-white hover:bg-walton-teal transition-colors shadow-xs"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#142d84] text-white hover:bg-walton-teal transition-colors shadow-xs"
                  aria-label="WhatsApp"
                >
                  <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.005 5.291 5.3 0 11.802 0c3.15.001 6.11 1.23 8.337 3.459 2.23 2.23 3.456 5.19 3.455 8.344-.006 6.51-5.302 11.8-11.8 11.8-2.01 0-3.98-.51-5.73-1.482L0 24zm6.59-4.877l.368.218c1.5.89 3.16 1.36 4.84 1.365 5.428 0 9.845-4.414 9.85-9.847a9.816 9.816 0 00-2.87-6.92 9.824 9.824 0 00-6.93-2.87C6.42 2.03 2.01 6.44 2.006 11.87c0 1.76.46 3.48 1.34 5.01l.24.42-.99 3.63 3.7-.97.35.21zM16.797 13.79c-.27-.13-.1.6-.68-.82l-.46-.77c-.16-.27-.33-.5-.6-.68a9.42 9.42 0 00-1.87-.96 1.83 1.83 0 00-.77.16l-.3.24c-.16.13-.3.3-.46.46l-.51.46c-.16.13-.33.16-.51.05a8.77 8.77 0 01-2.22-1.37c-.6-.52-1.12-1.12-1.5-1.78-.1-.17-.1-.3-.02-.43.08-.1.16-.23.25-.33l.36-.4c.08-.1.14-.2.17-.3a1.05 1.05 0 00-.03-.78l-.34-.82c-.15-.36-.3-.72-.46-1.08-.09-.2-.2-.24-.35-.24h-.3c-.15 0-.3.05-.44.17-.14.12-.49.48-.49 1.17s.5 1.36.57 1.46c.07.1 1.03 1.57 2.49 2.2a8.23 8.23 0 003.45.69c.35 0 .66-.03.9-.08.23-.05.7-.28.8-.55.1-.27.1-.5.07-.55l-.27-.17z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: About Walton Plaza */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide">
              About Walton Plaza
            </h3>
            <ul className="space-y-1.5 text-xs text-zinc-600">
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">About Us</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Message from MD</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Why Us</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Contact Us</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Product Certification</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Plaza List</Link></li>
            </ul>
          </div>

          {/* Column 3: Help & Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide">
              Help & Information
            </h3>
            <ul className="space-y-1.5 text-xs text-zinc-600">
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Payment Policy</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Delivery Policy</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Reward Policy</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Reject And Return Policy</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Privacy Policy</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">EMI Policy</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">How to Buy</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">FAQ</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Offer FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Top Categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide">
              Top Categories
            </h3>
            <ul className="space-y-1.5 text-xs text-zinc-600">
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Refrigerator & Freezer</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Air Conditioner</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Television</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Computer</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Home Appliances</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">E-Bike</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Washing Machine</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Kitchen Appliance</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Featured Products</Link></li>
            </ul>
          </div>

          {/* Column 5: Our Brands */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide">
              Our Brands
            </h3>
            <ul className="space-y-1.5 text-xs text-zinc-600">
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Walton</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">Safe</Link></li>
              <li><Link href="/products" className="hover:underline hover:text-walton-blue">ACC</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Payment Methods & Copyright Banner */}
      <div className="border-t border-zinc-300/40 bg-zinc-200/30 py-6 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="space-y-2">
            <span className="block text-xs font-bold text-[#1e3a5f] uppercase tracking-wider">
              Payment Method
            </span>
            <div className="relative mx-auto h-8 w-full max-w-[480px] sm:h-10">
              <Image
                src="/images/paymentMethod.png"
                alt="Payment Methods (Cash On Delivery, Visa, MasterCard, bKash, Rocket, Nagad, DBBL)"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 480px"
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 font-semibold mt-2">
            Copyright &copy; 2026 Walton Plaza
          </p>
        </div>
      </div>
    </footer>
  );
}
