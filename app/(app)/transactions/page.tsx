import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/app/PagePlaceholder";

export const metadata: Metadata = { title: "Transactions | GrimBank" };

export default function TransactionsPage() {
  return <PagePlaceholder title="Transactions" />;
}
