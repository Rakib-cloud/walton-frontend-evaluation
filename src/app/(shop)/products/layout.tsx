import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Walton Plaza products",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
