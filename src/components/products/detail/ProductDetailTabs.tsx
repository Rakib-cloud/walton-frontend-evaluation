"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ProductDetailTab = {
  id: string;
  title: string;
  content: ReactNode;
};

type ProductDetailTabsProps = {
  tabs: ProductDetailTab[];
};

export function ProductDetailTabs({ tabs }: ProductDetailTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  if (!activeTab) {
    return (
      <p className="rounded-md border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
        No additional information available.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
      <div
        className="flex gap-1 overflow-x-auto border-b border-zinc-200 bg-zinc-50 p-2 scrollbar-none"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTab.id}
            onClick={() => setActiveId(tab.id)}
            className={cn(
              "shrink-0 rounded-md px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer",
              tab.id === activeTab.id
                ? "bg-[#142D84] text-white shadow-sm"
                : "text-zinc-600 hover:bg-white hover:text-[#1e3a5f]",
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="p-6" role="tabpanel">
        {activeTab.content}
      </div>
    </div>
  );
}
