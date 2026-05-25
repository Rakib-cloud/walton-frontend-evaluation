export function HomeDeliveryCard() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500 animate-none">
            {/* Truck icon */}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 8h7.293a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1e3a5f]">Home Delivery</h4>
            <p className="text-xs text-zinc-500">2 - 3 Days</p>
          </div>
        </div>
        <span className="text-sm font-bold text-zinc-800">৳700</span>
      </div>

      <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-3 text-xs text-zinc-600 leading-relaxed">
        <span className="font-semibold text-zinc-800">Notice:</span> As per the delivery policy, please receive your ordered product within 5 days; otherwise, it will be automatically cancelled.
      </div>

      <div className="flex items-center gap-3 border-t border-zinc-100 pt-3 text-xs font-semibold text-zinc-700">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-50 text-emerald-600">
          {/* Cash stack / notes icon */}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        Cash on Delivery Available
      </div>
    </div>
  );
}
