import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { AppShell } from "@/components/app/AppShell";
import { Skeleton } from "@/components/app/Skeleton";
import { auth } from "@/lib/auth/auth";

// The shell renders immediately. The session check runs inside Suspense,
// so Next.js can show the placeholder while it resolves.
async function RequireSession({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  return children;
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <RequireSession>{children}</RequireSession>
      </Suspense>
    </AppShell>
  );
}
