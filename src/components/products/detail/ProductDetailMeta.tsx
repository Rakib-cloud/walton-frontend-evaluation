import { HtmlContent } from "@/components/products/detail/HtmlContent";
import { containsHtml } from "@/lib/sanitize-html";

export type ProductMetaItem = {
  label: string;
  value: string;
};

type ProductDetailMetaProps = {
  items: ProductMetaItem[];
};

export function ProductDetailMeta({ items }: ProductDetailMetaProps) {
  const visible = items.filter((item) => item.value.trim().length > 0);

  if (visible.length === 0) return null;

  return (
    <dl className="grid gap-3 rounded-md bg-zinc-50 p-4 sm:grid-cols-2">
      {visible.map((item) => (
        <div key={item.label}>
          <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {item.label}
          </dt>
          <dd className="mt-0.5 text-sm font-medium text-zinc-800">
            {containsHtml(item.value) ? (
              <HtmlContent content={item.value} className="!text-sm !font-medium !text-zinc-800" />
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
