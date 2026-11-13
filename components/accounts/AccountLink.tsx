import Link from "next/link";
import type { Account } from "@/lib/sample-data";
import { formatMoney } from "@/lib/money/format";

export function AccountLink({ account }: { account: Account }) {
  return (
    <Link
      href={`/accounts/${account.id}`}
      className="flex h-full flex-col rounded-xl border border-cream-line bg-cream-field p-6 transition-colors hover:bg-white"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-secondary">
        {account.type}
      </p>
      <p className="mt-2 text-lg font-semibold text-navy">{account.name}</p>
      <p className="mt-4 font-display text-3xl tabular-nums tracking-tight text-ink">
        {formatMoney(account.balanceMinor, account.currency)}
      </p>
      <p className="mt-auto pt-6 text-sm font-semibold text-navy underline">
        View account
      </p>
    </Link>
  );
}
