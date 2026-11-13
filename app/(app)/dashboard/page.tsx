import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/app/PagePlaceholder";

export const metadata: Metadata = { title: "Dashboard | GrimBank" };

export default function DashboardPage() {
  return <PagePlaceholder title="Dashboard" />;
}
