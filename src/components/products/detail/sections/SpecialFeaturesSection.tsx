import { AttributeGroupList } from "@/components/products/detail/AttributeGroupList";
import type { DetailAttributeGroup } from "@/features/products/utils/detail-sections";

type SpecialFeaturesSectionProps = {
  groups: DetailAttributeGroup[];
};

export function SpecialFeaturesSection({ groups }: SpecialFeaturesSectionProps) {
  return <AttributeGroupList groups={groups} proseLayout />;
}
