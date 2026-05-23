import { AttributeGroupList } from "@/components/products/detail/AttributeGroupList";
import type { DetailAttributeGroup } from "@/features/products/utils/detail-sections";

type DetailedInformationSectionProps = {
  groups: DetailAttributeGroup[];
};

export function DetailedInformationSection({
  groups,
}: DetailedInformationSectionProps) {
  return <AttributeGroupList groups={groups} specLayout />;
}
