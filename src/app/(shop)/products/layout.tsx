import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/PageContainer";

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
    <PageContainer>
      {children}
    </PageContainer>
  );
}
