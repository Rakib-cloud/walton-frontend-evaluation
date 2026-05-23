import type { DetailAttributeGroup } from "@/features/products/utils/detail-sections";
import { HtmlContent } from "@/components/products/detail/HtmlContent";
import { containsHtml } from "@/lib/sanitize-html";
import { cn } from "@/lib/cn";

type AttributeGroupListProps = {
  groups: DetailAttributeGroup[];
  /** Render long HTML blocks as full-width prose (e.g. warranty / terms) */
  proseLayout?: boolean;
  /** Two-column spec sheet for many short label/value rows */
  specLayout?: boolean;
};

export function AttributeGroupList({
  groups,
  proseLayout = false,
  specLayout = false,
}: AttributeGroupListProps) {
  if (groups.length === 0) {
    return (
      <p className="text-sm text-zinc-500">No information available.</p>
    );
  }

  if (specLayout) {
    return (
      <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {groups.map((group, index) => (
          <SpecRow key={`${group.label ?? "spec"}-${index}`} group={group} />
        ))}
      </dl>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group, index) => (
        <AttributeGroup
          key={`${group.label ?? "group"}-${index}`}
          group={group}
          proseLayout={proseLayout}
        />
      ))}
    </div>
  );
}

function SpecRow({ group }: { group: DetailAttributeGroup }) {
  return (
    <div className="border-b border-zinc-100 pb-4 sm:col-span-1">
      {group.label ? (
        <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {group.label}
        </dt>
      ) : null}
      <dd className={group.label ? "mt-1" : undefined}>
        {group.values.map((value, index) => (
          <HtmlContent key={`${group.label}-${index}`} content={value} />
        ))}
      </dd>
    </div>
  );
}

function AttributeGroup({
  group,
  proseLayout,
}: {
  group: DetailAttributeGroup;
  proseLayout: boolean;
}) {
  const isLongHtmlBlock =
    proseLayout ||
    group.values.some((value) => containsHtml(value) && value.length > 120);

  if (isLongHtmlBlock && group.values.length === 1) {
    return (
      <div className="space-y-2">
        {group.label ? (
          <h3 className="text-sm font-semibold capitalize text-[#1e3a5f]">
            {group.label}
          </h3>
        ) : null}
        <HtmlContent content={group.values[0]!} />
      </div>
    );
  }

  return (
    <div className="border-b border-zinc-100 pb-5 last:border-0 last:pb-0">
      {group.label ? (
        <p className="text-sm font-semibold capitalize text-[#1e3a5f]">
          {group.label}
        </p>
      ) : null}
      <ul className={cn(group.label ? "mt-2 space-y-2" : "space-y-2")}>
        {group.values.map((value, valueIndex) => (
          <li key={`${group.label}-${valueIndex}`}>
            <HtmlContent content={value} />
          </li>
        ))}
      </ul>
    </div>
  );
}
