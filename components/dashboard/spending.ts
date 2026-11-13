import type { Category, Transaction } from "@/lib/sample-data";

// Income and internal transfers aren't spending.
const NOT_SPENDING: Category[] = ["Income", "Transfers"];

export type CategorySpend = { category: Category; amountMinor: number };

export function spendingByCategory(transactions: Transaction[]): CategorySpend[] {
  const totals = new Map<Category, number>();
  for (const t of transactions) {
    if (t.amountMinor >= 0 || NOT_SPENDING.includes(t.category)) continue;
    totals.set(t.category, (totals.get(t.category) ?? 0) + -t.amountMinor);
  }
  return [...totals.entries()]
    .map(([category, amountMinor]) => ({ category, amountMinor }))
    .sort((a, b) => b.amountMinor - a.amountMinor);
}
