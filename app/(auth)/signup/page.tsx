import type { Metadata } from "next";
import { AuthVisualPanel } from "@/components/auth/AuthVisualPanel";
import { BrandLockup } from "@/components/auth/BrandLockup";
import { SignupForm } from "@/components/auth/SignupForm";
import { Sparkles } from "@/components/auth/icons";

export const metadata: Metadata = { title: "Create your account | GrimBank" };

export default function SignupPage() {
  return (
    <main className="login-shell">
      <section className="login-panel" aria-labelledby="signup-title">
        <BrandLockup />

        <div className="welcome-copy welcome-copy-compact">
          <p className="eyebrow">
            <Sparkles size={13} /> Get started
          </p>
          <h1 id="signup-title">Create your account</h1>
          <p className="intro">
            Get started with GrimBank and bring your financial activity into one
            organized place.
          </p>
        </div>

        <SignupForm />

        <footer className="login-footer">
          Development prototype. Balances and transactions are simulated.
        </footer>
      </section>

      <AuthVisualPanel />
    </main>
  );
}
