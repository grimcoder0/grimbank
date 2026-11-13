import { formatMoney } from "@/lib/money/format";

type Props = { totalMinor: number; currency: string; accountCount: number };

export function BalanceCard({ totalMinor, currency, accountCount }: Props) {
  return (
    <section aria-labelledby="total-balance" className="rounded-xl bg-navy p-6 text-white md:p-8">
      <h2 id="total-balance" className="text-sm font-medium text-line">
        Total balance
      </h2>
      <p className="mt-2 font-display text-5xl tracking-tight tabular-nums">
        {formatMoney(totalMinor, currency)}
      </p>
      <p className="mt-3 text-sm text-ink-muted">
        Across {accountCount} accounts
      </p>
    </section>
  );
}
