import { HomeDeliveryCard } from "@/components/products/detail/sections/HomeDeliveryCard";
import { ReturnWarrantyCard } from "@/components/products/detail/sections/ReturnWarrantyCard";
import { RelatedProductsCard } from "@/components/products/detail/sections/RelatedProductsCard";

type ProductDetailSidebarProps = {
  relatedCatalogProducts: any[];
};

export function ProductDetailSidebar({ relatedCatalogProducts }: ProductDetailSidebarProps) {
  return (
    <div className="lg:col-span-1 space-y-6">
      <HomeDeliveryCard />
      <ReturnWarrantyCard />
      <RelatedProductsCard relatedCatalogProducts={relatedCatalogProducts} />
    </div>
  );
}
