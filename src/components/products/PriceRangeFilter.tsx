"use client";

import { SlidersIcon } from "@/components/products/FilterSection";
import { formatFilterPrice } from "@/lib/format";

type PriceRangeFilterProps = {
  bounds: { min: number; max: number };
  valueMin: number;
  valueMax: number;
  onChange: (min: number, max: number) => void;
};

export function PriceRangeFilter({
  bounds,
  valueMin,
  valueMax,
  onChange,
}: PriceRangeFilterProps) {
  const { min: boundMin, max: boundMax } = bounds;
  const span = Math.max(boundMax - boundMin, 1);

  const minPercent = ((valueMin - boundMin) / span) * 100;
  const maxPercent = ((valueMax - boundMin) / span) * 100;

  const handleMinChange = (nextMin: number) => {
    onChange(Math.min(nextMin, valueMax), valueMax);
  };

  const handleMaxChange = (nextMax: number) => {
    onChange(valueMin, Math.max(nextMax, valueMin));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 text-sm text-zinc-600">
        <span className="shrink-0">
          <span className="font-semibold text-zinc-700">Min</span>{" "}
          {formatFilterPrice(boundMin)}
        </span>
        <SlidersIcon className="h-5 w-5 shrink-0 text-zinc-500" aria-hidden="true" />
        <span className="shrink-0 text-right">
          <span className="font-semibold text-zinc-700">Max</span>{" "}
          {formatFilterPrice(boundMax)}
        </span>
      </div>

      <div className="relative mx-1 h-7">
        <div
          className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-zinc-200"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#39a9bd]"
          style={{
            left: `${minPercent}%`,
            width: `${Math.max(maxPercent - minPercent, 0)}%`,
          }}
          aria-hidden="true"
        />
        <input
          type="range"
          min={boundMin}
          max={boundMax}
          step={1}
          value={valueMin}
          onChange={(event) => handleMinChange(Number(event.target.value))}
          className="price-range-input price-range-input--min"
          aria-label="Minimum price"
          aria-valuemin={boundMin}
          aria-valuemax={boundMax}
          aria-valuenow={valueMin}
        />
        <input
          type="range"
          min={boundMin}
          max={boundMax}
          step={1}
          value={valueMax}
          onChange={(event) => handleMaxChange(Number(event.target.value))}
          className="price-range-input price-range-input--max"
          aria-label="Maximum price"
          aria-valuemin={boundMin}
          aria-valuemax={boundMax}
          aria-valuenow={valueMax}
        />
      </div>

      <p className="text-center text-sm font-semibold text-[#39a9bd]">
        {formatFilterPrice(valueMin)}
        <span className="mx-2 font-normal text-zinc-400">-</span>
        {formatFilterPrice(valueMax)}
      </p>
    </div>
  );
}

export function PriceRangeFilterSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-200" />
        <div className="h-5 w-5 animate-pulse rounded bg-zinc-200" />
        <div className="h-4 w-28 animate-pulse rounded bg-zinc-200" />
      </div>
      <div className="mx-1 h-7 animate-pulse rounded-full bg-zinc-200" />
      <div className="mx-auto h-4 w-44 animate-pulse rounded bg-zinc-200" />
    </div>
  );
}
