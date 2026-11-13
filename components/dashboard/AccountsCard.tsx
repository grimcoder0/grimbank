import type { Account } from "@/lib/sample-data";
import { formatMoney } from "@/lib/money/format";

export function AccountsCard({ accounts }: { accounts: Account[] }) {
  return (
    <section aria-labelledby="accounts-heading" className="rounded-xl border border-cream-line bg-cream-field p-6">
      <h2 id="accounts-heading" className="text-lg font-semibold text-navy">
        Accounts
      </h2>
      <ul className="mt-4 divide-y divide-cream-line">
        {accounts.map((a) => (
          <li key={a.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-semibold text-ink">{a.name}</p>
              <p className="text-xs text-ink-secondary">{a.type}</p>
            </div>
            <p className="text-sm font-semibold tabular-nums text-ink">
              {formatMoney(a.balanceMinor, a.currency)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
