import { cn } from "@/lib/cn";
import { Skeleton } from "@/components/ui/Skeleton";

type FilterSectionProps = {
  title: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  highlighted?: boolean;
  children: React.ReactNode;
};

export function FilterSection({
  title,
  icon,
  defaultOpen = true,
  highlighted = false,
  children,
}: FilterSectionProps) {
  return (
    <details
      open={defaultOpen}
      className={cn(
        "group overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm",
        highlighted && "border-[#ebebe4] bg-[#fffff6]",
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2 text-sm font-semibold text-[#1e3a5f]">
          {icon}
          {title}
        </span>
        <ChevronIcon className="h-4 w-4 text-zinc-500 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-zinc-100 px-4 pb-4 pt-3">{children}</div>
    </details>
  );
}

export function FilterSectionSkeleton({
  rows = 3,
  highlighted = false,
  withInputs = false,
}: {
  rows?: number;
  highlighted?: boolean;
  withInputs?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm",
        highlighted && "border-[#ebebe4] bg-[#fffff6]",
      )}
    >
      <div className="flex items-center justify-between px-4 py-3.5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-sm" />
      </div>
      <div className="space-y-3 border-t border-zinc-100 px-4 pb-4 pt-3">
        {withInputs ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-9 w-full rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
            <Skeleton className="h-1.5 w-full rounded-full" />
            <Skeleton className="h-1.5 w-full rounded-full" />
          </>
        ) : (
          Array.from({ length: rows }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-3.5 flex-1" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SlidersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M2.75 6.75a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0zM4 6.75h14.25a.75.75 0 000-1.5H4a.75.75 0 000 1.5zM2.75 13.25a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0zM4 13.25h14.25a.75.75 0 000-1.5H4a.75.75 0 000 1.5z" />
    </svg>
  );
}

export function FunnelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M2.628 2.75A3.75 3.75 0 015.375 1h9.25a3.75 3.75 0 012.747 1.75 3.75 3.75 0 010 4.502 3.75 3.75 0 01-2.747 1.75h-2.5v6.5a.75.75 0 01-1.5 0v-6.5h-2.5a3.75 3.75 0 01-2.747-1.75 3.75 3.75 0 010-4.502zM5.375 3.5a2.25 2.25 0 00-1.653.72 2.25 2.25 0 000 3.06 2.25 2.25 0 001.653.72h9.25a2.25 2.25 0 001.653-.72 2.25 2.25 0 000-3.06 2.25 2.25 0 00-1.653-.72h-9.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SortIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M3 5.75A.75.75 0 013.75 5h12.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.75zm0 4.5A.75.75 0 013.75 9.5h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
    </svg>
  );
}

export function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5.5A.75.75 0 012.75 10h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 5.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}
