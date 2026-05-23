"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type LabeledSection = {
  id: string;
  title: string;
  items: Array<{
    label: string | null;
    values: string[];
  }>;
};

type LabeledSectionTabsProps = {
  sections: LabeledSection[];
};

export function LabeledSectionTabs({ sections }: LabeledSectionTabsProps) {
  const availableSections = sections.filter((section) => section.items.length > 0);
  const [activeId, setActiveId] = useState(availableSections[0]?.id ?? "");

  if (availableSections.length === 0) {
    return (
      <p className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-500">
        No additional information available.
      </p>
    );
  }

  const activeSection = availableSections.find(
    (section) => section.id === activeId,
  ) ?? availableSections[0]!;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white">
      <div className="flex flex-wrap gap-2 border-b border-zinc-200 p-3">
        {availableSections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setActiveId(section.id)}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              section.id === activeSection.id
                ? "bg-zinc-900 text-white"
                : "text-zinc-600 hover:bg-zinc-100",
            )}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="space-y-4 p-5">
        {activeSection.items.map((item, index) => (
          <div key={`${item.label}-${index}`} className="space-y-1">
            {item.label ? (
              <p className="text-sm font-semibold text-zinc-800">{item.label}</p>
            ) : null}
            <ul className="space-y-1 text-sm text-zinc-600">
              {item.values.map((value, valueIndex) => (
                <li key={`${value}-${valueIndex}`}>{value}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
