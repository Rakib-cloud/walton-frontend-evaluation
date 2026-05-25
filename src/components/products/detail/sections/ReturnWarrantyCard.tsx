export function ReturnWarrantyCard() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs space-y-4">
      <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1e3a5f] border-b border-zinc-100 pb-3">
        Return & Warranty
      </h4>

      <div className="space-y-3.5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            {/* Box icon */}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-zinc-700 leading-snug">
            Return as per company policy
          </p>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            {/* Shield icon */}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-zinc-700 leading-snug">
            Warranty as per company policy
          </p>
        </div>
      </div>
    </div>
  );
}
