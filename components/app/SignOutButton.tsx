"use client";

import { useTransition } from "react";
import { signOutAction } from "@/app/actions/auth";

export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => signOutAction())}
      className="rounded-lg border border-cream-line bg-cream-field px-3.5 py-2 text-sm font-semibold text-navy hover:bg-white disabled:opacity-60"
    >
      Sign out
    </button>
  );
}
