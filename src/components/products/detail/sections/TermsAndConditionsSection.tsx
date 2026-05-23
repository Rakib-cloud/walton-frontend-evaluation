import { AttributeGroupList } from "@/components/products/detail/AttributeGroupList";
import type { DetailAttributeGroup } from "@/features/products/utils/detail-sections";

type TermsAndConditionsSectionProps = {
  groups: DetailAttributeGroup[];
};

export function TermsAndConditionsSection({
  groups,
}: TermsAndConditionsSectionProps) {
  return <AttributeGroupList groups={groups} proseLayout />;
}
