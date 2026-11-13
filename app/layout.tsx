import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://grimbank.vercel.app"),
  title: "GrimBank",
  description:
    "A prototype financial application. All balances and transactions are simulated.",
  icons: { icon: [{ url: "/favicon.gif", type: "image/gif" }] },
  openGraph: {
    title: "GrimBank",
    description:
      "A prototype financial application. All balances and transactions are simulated.",
    siteName: "GrimBank",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
