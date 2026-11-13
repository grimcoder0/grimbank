import type { Metadata } from "next";
import { AccountLink } from "@/components/accounts/AccountLink";
import { EmptyState } from "@/components/app/EmptyState";
import { SampleBadge } from "@/components/dashboard/SampleBadge";
import { listAccounts } from "@/lib/accounts";
import { formatMoney, sumMinor } from "@/lib/money/format";

export const metadata: Metadata = { title: "Accounts | GrimBank" };

export default function AccountsPage() {
  const accounts = listAccounts();
  const total = sumMinor(accounts.map((a) => a.balanceMinor));
  const currency = accounts[0]?.currency ?? "USD";

  return (
    <div className="max-w-4xl space-y-6">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-4xl tracking-tight text-navy">Accounts</h1>
        <SampleBadge />
      </header>

      {accounts.length === 0 ? (
        <EmptyState
          title="No accounts yet"
          message="Accounts will appear here once they're set up."
        />
      ) : (
        <>
          <p className="text-base text-ink-secondary">
            Total across {accounts.length} accounts:{" "}
            <span className="font-semibold text-ink tabular-nums">
              {formatMoney(total, currency)}
            </span>
          </p>
          <ul className="grid gap-4 md:grid-cols-2">
            {accounts.map((account) => (
              <li key={account.id}>
                <AccountLink account={account} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
