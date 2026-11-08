import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLockup } from "@/components/auth/BrandLockup";
import { LEGAL_DRAFT_DATE } from "@/lib/legal/versions";

type LegalPageProps = {
  title: string;
  version: string;
  children: ReactNode;
};

export function LegalPage({ title, version, children }: LegalPageProps) {
  return (
    <main className="legal-shell">
      <header>
        <Link href="/login" aria-label="GrimBank, go to sign in">
          <BrandLockup />
        </Link>
      </header>

      <article className="legal-doc">
        <h1>{title}</h1>
        <p className="legal-meta">
          Version {version} · Last edited {LEGAL_DRAFT_DATE}
        </p>

        <p className="legal-draft" role="note">
          <strong>Draft placeholder.</strong> This document is not in force and
          has not been reviewed by a lawyer. GrimBank is a development
          prototype that uses simulated data. The final version must be written
          or approved by qualified legal counsel before real users or real
          money are involved.
        </p>

        {children}

        <p className="legal-back">
          <Link className="text-link" href="/signup">
            Back to create account
          </Link>
        </p>
      </article>
    </main>
  );
}
