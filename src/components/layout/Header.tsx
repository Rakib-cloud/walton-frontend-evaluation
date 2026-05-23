import Link from "next/link";
import { WaltonPlazaLogo } from "@/components/layout/WaltonPlazaLogo";
import { CartLauncher } from "@/features/cart/components/CartLauncher";
import { env } from "@/config/env";

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center"
          aria-label={`${env.NEXT_PUBLIC_APP_NAME} home`}
        >
          <WaltonPlazaLogo className="h-6 sm:h-7" />
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-zinc-600">
          <Link href="/products" className="transition-colors hover:text-zinc-900">
            Products
          </Link>
          <CartLauncher />
        </nav>
      </div>
    </header>
  );
}
