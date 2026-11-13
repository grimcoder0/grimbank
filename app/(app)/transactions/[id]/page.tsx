import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SampleBadge } from "@/components/dashboard/SampleBadge";
import { getAccount } from "@/lib/accounts";
import { formatLongDate } from "@/lib/format-date";
import { formatMoney } from "@/lib/money/format";
import { getTransaction, listTransactions } from "@/lib/transactions";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return listTransactions().map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const transaction = getTransaction(id);
  return {
    title: transaction
      ? `${transaction.description} | GrimBank`
      : "Transaction not found | GrimBank",
  };
}

export default async function TransactionPage({ params }: Params) {
  const { id } = await params;
  const transaction = getTransaction(id);
  if (!transaction) notFound();

  const account = getAccount(transaction.accountId);
  const isMoneyIn = transaction.amountMinor > 0;

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/transactions" className="text-sm font-semibold text-navy underline">
        Back to transactions
      </Link>

      <header className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-4xl tracking-tight text-navy">
          {transaction.description}
        </h1>
        <SampleBadge />
      </header>

      <section
        aria-labelledby="amount-heading"
        className="rounded-xl bg-navy p-6 text-white md:p-8"
      >
        <h2 id="amount-heading" className="text-sm font-medium text-line">
          {isMoneyIn ? "Money in" : "Money out"}
        </h2>
        <p className="mt-2 font-display text-5xl tracking-tight tabular-nums">
          {formatMoney(transaction.amountMinor, transaction.currency)}
        </p>
      </section>

      <dl className="divide-y divide-cream-line rounded-xl border border-cream-line bg-cream-field">
        <div className="flex justify-between gap-4 px-5 py-4">
          <dt className="text-sm text-ink-secondary">Date</dt>
          <dd className="text-sm font-semibold text-ink">
            {formatLongDate(transaction.occurredOn)}
          </dd>
        </div>
        <div className="flex justify-between gap-4 px-5 py-4">
          <dt className="text-sm text-ink-secondary">Category</dt>
          <dd className="text-sm font-semibold text-ink">{transaction.category}</dd>
        </div>
        <div className="flex justify-between gap-4 px-5 py-4">
          <dt className="text-sm text-ink-secondary">Status</dt>
          <dd className="text-sm font-semibold text-ink">
            {transaction.status === "pending" ? "Pending" : "Completed"}
          </dd>
        </div>
        <div className="flex justify-between gap-4 px-5 py-4">
          <dt className="text-sm text-ink-secondary">Account</dt>
          <dd className="text-sm font-semibold text-ink">
            {account ? (
              <Link href={`/accounts/${account.id}`} className="underline">
                {account.name}
              </Link>
            ) : (
              "Unknown account"
            )}
          </dd>
        </div>
        <div className="flex justify-between gap-4 px-5 py-4">
          <dt className="text-sm text-ink-secondary">Reference</dt>
          <dd className="font-mono text-sm text-ink">{transaction.id}</dd>
        </div>
      </dl>
    </div>
  );
}
