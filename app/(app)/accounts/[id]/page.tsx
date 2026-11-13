import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { SampleBadge } from "@/components/dashboard/SampleBadge";
import { getAccount, listAccounts, listAccountTransactions } from "@/lib/accounts";
import { formatMoney } from "@/lib/money/format";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return listAccounts().map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const account = getAccount(id);
  return {
    title: account ? `${account.name} | GrimBank` : "Account not found | GrimBank",
  };
}

export default async function AccountPage({ params }: Params) {
  const { id } = await params;
  const account = getAccount(id);
  if (!account) notFound();

  const transactions = listAccountTransactions(account.id);

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/accounts" className="text-sm font-semibold text-navy underline">
        Back to accounts
      </Link>

      <header className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-4xl tracking-tight text-navy">{account.name}</h1>
        <SampleBadge />
      </header>

      <section
        aria-labelledby="account-summary"
        className="rounded-xl bg-navy p-6 text-white md:p-8"
      >
        <h2 id="account-summary" className="text-sm font-medium text-line">
          {account.type} account · Balance
        </h2>
        <p className="mt-2 font-display text-5xl tracking-tight tabular-nums">
          {formatMoney(account.balanceMinor, account.currency)}
        </p>
      </section>

      {transactions.length > 0 ? (
        <RecentTransactions transactions={transactions} />
      ) : (
        <p className="text-base text-ink-secondary">No transactions on this account yet.</p>
      )}
    </div>
  );
}
