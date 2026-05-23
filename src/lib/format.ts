export function formatCurrency(amount: number): string {
  return `৳ ${amount.toLocaleString("en-BD", { maximumFractionDigits: 0 })}`;
}

/** Compact price label for filters (Indian numbering: 2,42,900) */
export function formatFilterPrice(amount: number): string {
  return `৳${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}
