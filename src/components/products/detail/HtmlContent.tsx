"use client";

import { useMemo } from "react";
import { containsHtml, sanitizeHtml } from "@/lib/sanitize-html";
import { cn } from "@/lib/cn";

type HtmlContentProps = {
  content: string;
  className?: string;
};

export function HtmlContent({ content, className }: HtmlContentProps) {
  const sanitized = useMemo(() => sanitizeHtml(content), [content]);

  if (!containsHtml(content)) {
    const hasNewlines = content.includes("\n");

    return (
      <p
        className={cn(
          "text-sm leading-relaxed text-zinc-600",
          hasNewlines && "whitespace-pre-line",
          className,
        )}
      >
        {content}
      </p>
    );
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-thin">
      <div
        className={cn("product-html text-sm leading-relaxed text-zinc-600 min-w-full inline-block", className)}
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    </div>
  );
}
