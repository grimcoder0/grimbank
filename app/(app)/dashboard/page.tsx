import type { Metadata } from "next";
import { AccountsCard } from "@/components/dashboard/AccountsCard";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { SampleBadge } from "@/components/dashboard/SampleBadge";
import { SpendingBars } from "@/components/dashboard/SpendingBars";
import { spendingByCategory } from "@/components/dashboard/spending";
import { sampleAccounts, sampleTransactions } from "@/lib/sample-data";
import { sumMinor } from "@/lib/money/format";

export const metadata: Metadata = { title: "Dashboard | GrimBank" };

export default function DashboardPage() {
  const currency = sampleAccounts[0].currency;
  const total = sumMinor(sampleAccounts.map((a) => a.balanceMinor));
  const spending = spendingByCategory(sampleTransactions);

  return (
    <div className="max-w-5xl space-y-6">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-4xl tracking-tight text-navy">Dashboard</h1>
        <SampleBadge />
      </header>

      <BalanceCard totalMinor={total} currency={currency} accountCount={sampleAccounts.length} />

      <div className="grid gap-6 md:grid-cols-2">
        <AccountsCard accounts={sampleAccounts} />
        <SpendingBars items={spending} currency={currency} />
      </div>

      <RecentTransactions transactions={sampleTransactions.slice(0, 5)} />
    </div>
  );
}
