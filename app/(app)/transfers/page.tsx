import type { Metadata } from "next";
import { TransferFlow } from "@/components/transfers/TransferFlow";
import { SampleBadge } from "@/components/dashboard/SampleBadge";
import { listAccounts } from "@/lib/accounts";

export const metadata: Metadata = { title: "Transfers | GrimBank" };

export default function TransfersPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-4xl tracking-tight text-navy">Transfers</h1>
        <SampleBadge />
      </header>
      <p className="max-w-xl text-base leading-7 text-ink-secondary">
        Move money between your own accounts. Nothing is sent to anyone else,
        and no real money moves in this prototype.
      </p>
      <TransferFlow accounts={listAccounts()} />
    </div>
  );
}
