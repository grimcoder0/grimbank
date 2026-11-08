import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GrimBank",
  description:
    "A prototype financial application. All balances and transactions are simulated.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
