import { AttributeGroupList } from "@/components/products/detail/AttributeGroupList";
import type { DetailAttributeGroup } from "@/features/products/utils/detail-sections";

type BasicInformationSectionProps = {
  groups: DetailAttributeGroup[];
};

export function BasicInformationSection({ groups }: BasicInformationSectionProps) {
  return <AttributeGroupList groups={groups} specLayout />;
}
