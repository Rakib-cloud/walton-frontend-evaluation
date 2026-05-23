import type { ProductDetailFieldsFragment } from "@/graphql/generated/graphql";

export type DetailAttributeGroup = {
  label: string | null;
  values: string[];
};

export const EMPTY_ATTRIBUTE_VALUE = "—";

type GraphQLAttributeGroups =
  | ProductDetailFieldsFragment["productAttributes"]
  | ProductDetailFieldsFragment["detailedDescriptions"]
  | ProductDetailFieldsFragment["deliveries"]
  | ProductDetailFieldsFragment["serviceAndDeliveries"]
  | ProductDetailFieldsFragment["priceAndStocks"];

function normalizeValues(values: Array<{ enName: string | null }>): string[] {
  return values
    .map((value) => value.enName?.trim() ?? "")
    .filter((value) => value.length > 0);
}

/** Map API attribute groups; labeled rows with no value show "—" */
export function mapAttributeGroups(
  groups: GraphQLAttributeGroups,
): DetailAttributeGroup[] {
  if (!groups?.length) return [];

  return groups
    .map((group) => {
      const label = group.enLabel?.trim() || null;
      const values = normalizeValues(group.values);

      if (values.length > 0) {
        return { label, values };
      }

      if (label) {
        return { label, values: [EMPTY_ATTRIBUTE_VALUE] };
      }

      return null;
    })
    .filter((group): group is DetailAttributeGroup => group != null);
}

export function hasAttributeGroups(groups: GraphQLAttributeGroups): boolean {
  if (!groups?.length) return false;

  return groups.some((group) => {
    const hasLabel = Boolean(group.enLabel?.trim());
    const hasValue = group.values.some((value) => Boolean(value.enName?.trim()));
    return hasLabel || hasValue;
  });
}

const SUMMARY_META_LABEL = /^(brand|model|series(\s+name)?)$/i;

export function filterGroupsForBasicTab(
  groups: DetailAttributeGroup[],
): DetailAttributeGroup[] {
  return groups.filter(
    (group) => !group.label || !SUMMARY_META_LABEL.test(group.label),
  );
}

export function getDetailAttributeValue(
  groups: ProductDetailFieldsFragment["productAttributes"],
  labelMatchers: RegExp[],
): string | null {
  if (!groups?.length) return null;

  const match = groups.find((group) =>
    labelMatchers.some((matcher) =>
      group.enLabel ? matcher.test(group.enLabel) : false,
    ),
  );

  const raw = match?.values[0]?.enName?.trim();
  return raw || null;
}
