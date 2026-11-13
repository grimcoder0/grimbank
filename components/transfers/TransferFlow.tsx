"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import type { Account } from "@/lib/sample-data";
import { formatMoney } from "@/lib/money/format";
import { validateTransfer, type TransferErrors } from "@/lib/transfers";

type Step = "form" | "review" | "done";

const fieldClasses =
  "h-11 w-full rounded-lg border border-cream-line bg-cream-field px-3 text-sm text-ink";
const labelClasses = "mb-1.5 block text-xs font-semibold text-ink";
const errorClasses = "mt-1.5 text-sm text-danger";
const primaryButton =
  "inline-flex h-11 items-center justify-center rounded-lg bg-navy px-5 text-sm font-semibold text-white hover:bg-navy-deep";
const secondaryButton =
  "inline-flex h-11 items-center justify-center rounded-lg border border-cream-line bg-cream-field px-5 text-sm font-semibold text-navy hover:bg-white";

export function TransferFlow({ accounts }: { accounts: Account[] }) {
  const [step, setStep] = useState<Step>("form");
  const [fromId, setFromId] = useState(accounts[0]?.id ?? "");
  const [toId, setToId] = useState(accounts[1]?.id ?? "");
  const [amountText, setAmountText] = useState("");
  const [amountMinor, setAmountMinor] = useState(0);
  const [errors, setErrors] = useState<TransferErrors>({});
  const [reference, setReference] = useState("");
  const fromRef = useRef<HTMLSelectElement>(null);
  const toRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const from = accounts.find((a) => a.id === fromId);
  const to = accounts.find((a) => a.id === toId);

  function handleReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateTransfer({ fromId, toId, amountText }, accounts);
    if (!result.ok) {
      setErrors(result.errors);
      if (result.errors.fromId) fromRef.current?.focus();
      else if (result.errors.toId) toRef.current?.focus();
      else amountRef.current?.focus();
      return;
    }
    setErrors({});
    setAmountMinor(result.amountMinor);
    setStep("review");
  }

  function handleConfirm() {
    setReference(`SIM-${crypto.randomUUID().slice(0, 8).toUpperCase()}`);
    setStep("done");
  }

  function startAgain() {
    setAmountText("");
    setErrors({});
    setStep("form");
  }

  if (step === "done" && from && to) {
    return (
      <section
        role="status"
        aria-labelledby="done-heading"
        className="max-w-xl space-y-5 rounded-xl border border-cream-line bg-cream-field p-6 md:p-8"
      >
        <h2 id="done-heading" className="font-display text-3xl tracking-tight text-navy">
          Simulated transfer complete
        </h2>
        <p className="text-base leading-7 text-ink-secondary">
          No real money moved. Sample balances are unchanged, because this
          prototype doesn&apos;t yet store transfers.
        </p>
        <dl className="divide-y divide-cream-line rounded-lg border border-cream-line bg-white">
          <div className="flex justify-between px-4 py-3 text-sm">
            <dt className="text-ink-secondary">Amount</dt>
            <dd className="font-semibold tabular-nums">{formatMoney(amountMinor, from.currency)}</dd>
          </div>
          <div className="flex justify-between px-4 py-3 text-sm">
            <dt className="text-ink-secondary">From</dt>
            <dd className="font-semibold">{from.name}</dd>
          </div>
          <div className="flex justify-between px-4 py-3 text-sm">
            <dt className="text-ink-secondary">To</dt>
            <dd className="font-semibold">{to.name}</dd>
          </div>
          <div className="flex justify-between px-4 py-3 text-sm">
            <dt className="text-ink-secondary">Reference</dt>
            <dd className="font-mono font-semibold">{reference}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={startAgain} className={primaryButton}>
            Make another transfer
          </button>
          <Link href="/transactions" className={secondaryButton}>
            View transactions
          </Link>
        </div>
      </section>
    );
  }

  if (step === "review" && from && to) {
    return (
      <section aria-labelledby="review-heading" className="max-w-xl space-y-5">
        <h2 id="review-heading" className="font-display text-3xl tracking-tight text-navy">
          Review transfer
        </h2>
        <dl className="divide-y divide-cream-line rounded-xl border border-cream-line bg-cream-field">
          <div className="flex justify-between px-5 py-4 text-sm">
            <dt className="text-ink-secondary">Amount</dt>
            <dd className="font-semibold tabular-nums">{formatMoney(amountMinor, from.currency)}</dd>
          </div>
          <div className="flex justify-between px-5 py-4 text-sm">
            <dt className="text-ink-secondary">From</dt>
            <dd className="font-semibold">{from.name}</dd>
          </div>
          <div className="flex justify-between px-5 py-4 text-sm">
            <dt className="text-ink-secondary">To</dt>
            <dd className="font-semibold">{to.name}</dd>
          </div>
        </dl>
        <p className="text-sm text-ink-secondary">
          This is a simulation. Confirming won&apos;t move any real money.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleConfirm} className={primaryButton}>
            Confirm transfer
          </button>
          <button type="button" onClick={() => setStep("form")} className={secondaryButton}>
            Edit
          </button>
        </div>
      </section>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleReview}
      className="max-w-xl space-y-5 rounded-xl border border-cream-line bg-cream-field p-6 md:p-8"
    >
      <div>
        <label htmlFor="transfer-from" className={labelClasses}>
          From
        </label>
        <select
          id="transfer-from"
          ref={fromRef}
          value={fromId}
          onChange={(e) => setFromId(e.target.value)}
          aria-invalid={errors.fromId ? true : undefined}
          aria-describedby={errors.fromId ? "transfer-from-error" : undefined}
          className={fieldClasses}
        >
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} ({formatMoney(a.balanceMinor, a.currency)})
            </option>
          ))}
        </select>
        {errors.fromId && (
          <p id="transfer-from-error" className={errorClasses}>
            {errors.fromId}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="transfer-to" className={labelClasses}>
          To
        </label>
        <select
          id="transfer-to"
          ref={toRef}
          value={toId}
          onChange={(e) => setToId(e.target.value)}
          aria-invalid={errors.toId ? true : undefined}
          aria-describedby={errors.toId ? "transfer-to-error" : undefined}
          className={fieldClasses}
        >
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        {errors.toId && (
          <p id="transfer-to-error" className={errorClasses}>
            {errors.toId}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="transfer-amount" className={labelClasses}>
          Amount (USD)
        </label>
        <input
          id="transfer-amount"
          ref={amountRef}
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={amountText}
          onChange={(e) => setAmountText(e.target.value)}
          aria-invalid={errors.amount ? true : undefined}
          aria-describedby={errors.amount ? "transfer-amount-error" : undefined}
          className={fieldClasses}
        />
        {errors.amount && (
          <p id="transfer-amount-error" className={errorClasses}>
            {errors.amount}
          </p>
        )}
      </div>

      <button type="submit" className={primaryButton}>
        Review transfer
      </button>
    </form>
  );
}
