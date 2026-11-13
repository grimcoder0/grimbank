import { EmptyState } from "@/components/app/EmptyState";
import type { Transaction } from "@/lib/sample-data";
import { formatMoney } from "@/lib/money/format";
import { formatShortDate } from "@/lib/format-date";

export function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  return (
    <section aria-labelledby="recent-heading" className="rounded-xl border border-cream-line bg-cream-field p-6">
      <h2 id="recent-heading" className="text-lg font-semibold text-navy">
        Recent transactions
      </h2>
      {transactions.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="No transactions yet"
            message="Activity will appear here once money starts moving."
          />
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-cream-line">
          {transactions.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{t.description}</p>
                <p className="text-xs text-ink-secondary">
                  {t.category} · {formatShortDate(t.occurredOn)}
                  {t.status === "pending" && " · Pending"}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold tabular-nums text-ink">
                {formatMoney(t.amountMinor, t.currency)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
