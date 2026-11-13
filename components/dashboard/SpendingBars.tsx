import type { CategorySpend } from "@/components/dashboard/spending";
import { formatMoney } from "@/lib/money/format";

export function SpendingBars({ items, currency }: { items: CategorySpend[]; currency: string }) {
  const max = items.length > 0 ? Math.max(...items.map((i) => i.amountMinor)) : 0;
  return (
    <section aria-labelledby="spending-heading" className="rounded-xl border border-cream-line bg-cream-field p-6">
      <h2 id="spending-heading" className="text-lg font-semibold text-navy">
        Spending by category
      </h2>
      <ul className="mt-4 space-y-4">
        {items.map((item) => {
          const pct = max === 0 ? 0 : Math.round((item.amountMinor / max) * 100);
          return (
            <li key={item.category}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{item.category}</span>
                <span className="tabular-nums text-ink-secondary">
                  {formatMoney(item.amountMinor, currency)}
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full rounded-full bg-cream-line" aria-hidden="true">
                <div className="h-2 rounded-full bg-accent" style={{ width: `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
