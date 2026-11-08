import type { Metadata } from "next";
import Link from "next/link";
import { AuthIntroShell } from "@/components/auth/AuthIntroShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { ArrowRight } from "@/components/auth/icons";

export const metadata: Metadata = { title: "Sign in | GrimBank" };

export default function LoginPage() {
  return (
    <AuthIntroShell titleId="welcome-title" label="Your money, in focus">
      <div className="welcome-copy">
        <h1 id="welcome-title">Welcome back.</h1>
        <p className="intro">Sign in to continue to your GrimBank account.</p>
      </div>

      <LoginForm />

      <div className="signup-prompt">
        <span>Don&apos;t have a GrimBank account?</span>
        <Link className="text-link" href="/signup">
          Create an account <ArrowRight size={14} />
        </Link>
      </div>

      <footer className="login-footer">
        Development prototype. Balances and transactions are simulated.
      </footer>
    </AuthIntroShell>
  );
}
