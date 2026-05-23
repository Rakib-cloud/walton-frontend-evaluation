"use client";

import { useMemo } from "react";
import type { ProductDetailFieldsFragment } from "@/graphql/generated/graphql";
import {
  filterGroupsForBasicTab,
  hasAttributeGroups,
  mapAttributeGroups,
} from "@/features/products/utils/detail-sections";
import { ProductDetailTabs, type ProductDetailTab } from "@/components/products/detail/ProductDetailTabs";
import { BasicInformationSection } from "@/components/products/detail/sections/BasicInformationSection";
import { DetailedInformationSection } from "@/components/products/detail/sections/DetailedInformationSection";
import { TermsAndConditionsSection } from "@/components/products/detail/sections/TermsAndConditionsSection";
import { WarrantyInformationSection } from "@/components/products/detail/sections/WarrantyInformationSection";
import { SpecialFeaturesSection } from "@/components/products/detail/sections/SpecialFeaturesSection";

type ProductDetailInfoProps = {
  product: ProductDetailFieldsFragment;
};

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const tabs = useMemo(() => {
    const entries: ProductDetailTab[] = [];

    const basicGroups = filterGroupsForBasicTab(
      mapAttributeGroups(product.productAttributes),
    );

    if (basicGroups.length > 0) {
      entries.push({
        id: "basic",
        title: "Basic Information",
        content: <BasicInformationSection groups={basicGroups} />,
      });
    }

    if (hasAttributeGroups(product.detailedDescriptions)) {
      entries.push({
        id: "detailed",
        title: "Detailed Information",
        content: (
          <DetailedInformationSection
            groups={mapAttributeGroups(product.detailedDescriptions)}
          />
        ),
      });
    }

    if (hasAttributeGroups(product.deliveries)) {
      entries.push({
        id: "terms",
        title: "Terms & Conditions",
        content: (
          <TermsAndConditionsSection
            groups={mapAttributeGroups(product.deliveries)}
          />
        ),
      });
    }

    if (hasAttributeGroups(product.serviceAndDeliveries)) {
      entries.push({
        id: "warranty",
        title: "Warranty Information",
        content: (
          <WarrantyInformationSection
            groups={mapAttributeGroups(product.serviceAndDeliveries)}
          />
        ),
      });
    }

    if (hasAttributeGroups(product.priceAndStocks)) {
      entries.push({
        id: "features",
        title: "Special Features",
        content: (
          <SpecialFeaturesSection
            groups={mapAttributeGroups(product.priceAndStocks)}
          />
        ),
      });
    }

    return entries;
  }, [product]);

  return (
    <section aria-label="Product information">
      <h2 className="mb-4 text-lg font-semibold text-[#1e3a5f]">
        Product Information
      </h2>
      <ProductDetailTabs tabs={tabs} />
    </section>
  );
}
