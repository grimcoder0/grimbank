import type { Metadata } from "next";
import { TransactionsExplorer } from "@/components/transactions/TransactionsExplorer";
import { SampleBadge } from "@/components/dashboard/SampleBadge";
import { listTransactions } from "@/lib/transactions";

export const metadata: Metadata = { title: "Transactions | GrimBank" };

export default function TransactionsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-4xl tracking-tight text-navy">Transactions</h1>
        <SampleBadge />
      </header>
      <TransactionsExplorer transactions={listTransactions()} />
    </div>
  );
}
