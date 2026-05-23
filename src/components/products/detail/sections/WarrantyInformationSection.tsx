import { AttributeGroupList } from "@/components/products/detail/AttributeGroupList";
import type { DetailAttributeGroup } from "@/features/products/utils/detail-sections";

type WarrantyInformationSectionProps = {
  groups: DetailAttributeGroup[];
};

export function WarrantyInformationSection({
  groups,
}: WarrantyInformationSectionProps) {
  return <AttributeGroupList groups={groups} proseLayout />;
}
