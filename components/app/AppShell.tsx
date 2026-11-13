"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { AppIcon } from "@/components/app/AppIcon";
import { AppLogo } from "@/components/app/AppLogo";
import { navItems } from "@/components/app/nav-items";

const SIGN_OUT_NOTICE =
  "Sign-out isn't available yet. Real sessions come with the back-end stage.";

function linkClasses(active: boolean, mobile: boolean) {
  if (mobile) {
    return `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${
      active ? "text-accent" : "text-white/70 hover:text-white"
    }`;
  }
  return `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
  }`;
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-cream text-ink md:flex">
      <aside
        aria-label="Primary"
        className="hidden w-64 shrink-0 flex-col bg-navy px-5 py-8 md:sticky md:top-0 md:flex md:h-screen"
      >
        <Link href="/dashboard" aria-label="GrimBank dashboard">
          <AppLogo tone="light" />
        </Link>
        <nav className="mt-10 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={linkClasses(active, false)}
              >
                <AppIcon name={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <p className="mt-auto text-xs leading-5 text-white/50">
          Development prototype. Balances and transactions are simulated.
        </p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-cream-line bg-cream px-5 py-4 md:px-8">
          <div className="md:hidden">
            <AppLogo />
          </div>
          <p className="hidden text-sm text-ink-secondary md:block">
            Prototype · simulated data
          </p>
          <button
            type="button"
            onClick={() => setNotice(SIGN_OUT_NOTICE)}
            className="rounded-lg border border-cream-line bg-cream-field px-3.5 py-2 text-sm font-semibold text-navy hover:bg-white"
          >
            Sign out
          </button>
        </header>

        {notice && (
          <div
            role="status"
            className="mx-5 mt-4 rounded-lg border border-cream-line bg-cream-field px-4 py-3 text-sm text-ink md:mx-8"
          >
            {notice}
          </div>
        )}

        <main className="flex-1 px-5 py-8 pb-28 md:px-8 md:pb-10">{children}</main>
      </div>

      <nav
        aria-label="Primary mobile"
        className="fixed inset-x-0 bottom-0 z-10 flex border-t border-white/10 bg-navy md:hidden"
      >
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={linkClasses(active, true)}
            >
              <AppIcon name={item.icon} size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
