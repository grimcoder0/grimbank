import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-navy">GrimBank</h1>
      <p className="mt-2 text-ink-secondary">
        Development prototype. No accounts, authentication, or real money are
        connected yet.
      </p>
      <p className="mt-6">
        <Link href="/login" className="font-medium text-navy underline">
          View the sign-in page
        </Link>
      </p>
    </main>
  );
}
