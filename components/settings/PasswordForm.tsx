"use client";

import { useState, type FormEvent } from "react";
import { PASSWORD_MIN_LENGTH } from "@/lib/validation/auth";
import { validatePasswordChange, type PasswordErrors } from "@/lib/settings";

const fieldClasses =
  "h-11 w-full rounded-lg border border-cream-line bg-white px-3 text-sm text-ink";

export function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validatePasswordChange({ current, next, confirm });
    if (!result.ok) {
      setErrors(result.errors);
      setNotice(null);
      return;
    }
    setErrors({});
    setNotice(
      "Changing your password isn't available yet. It will work once accounts are connected to the back end.",
    );
  }

  return (
    <section
      aria-labelledby="password-heading"
      className="rounded-xl border border-cream-line bg-cream-field p-6 md:p-8"
    >
      <h2 id="password-heading" className="text-lg font-semibold text-navy">
        Change password
      </h2>
      <form noValidate onSubmit={handleSubmit} className="mt-5 space-y-5">
        <div>
          <label htmlFor="current-password" className="mb-1.5 block text-xs font-semibold text-ink">
            Current password
          </label>
          <input
            id="current-password"
            type="password"
            autoComplete="current-password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            aria-invalid={errors.current ? true : undefined}
            aria-describedby={errors.current ? "current-password-error" : undefined}
            className={fieldClasses}
          />
          {errors.current && (
            <p id="current-password-error" className="mt-1.5 text-sm text-danger">
              {errors.current}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="new-password" className="mb-1.5 block text-xs font-semibold text-ink">
            New password
          </label>
          <input
            id="new-password"
            type="password"
            autoComplete="new-password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            aria-invalid={errors.next ? true : undefined}
            aria-describedby={`new-password-hint${errors.next ? " new-password-error" : ""}`}
            className={fieldClasses}
          />
          <p id="new-password-hint" className="mt-1.5 text-xs text-ink-secondary">
            At least {PASSWORD_MIN_LENGTH} characters.
          </p>
          {errors.next && (
            <p id="new-password-error" className="mt-1.5 text-sm text-danger">
              {errors.next}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirm-password" className="mb-1.5 block text-xs font-semibold text-ink">
            Confirm new password
          </label>
          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-invalid={errors.confirm ? true : undefined}
            aria-describedby={errors.confirm ? "confirm-password-error" : undefined}
            className={fieldClasses}
          />
          {errors.confirm && (
            <p id="confirm-password-error" className="mt-1.5 text-sm text-danger">
              {errors.confirm}
            </p>
          )}
        </div>

        {notice && (
          <p role="status" className="rounded-lg border border-cream-line bg-white px-4 py-3 text-sm text-ink">
            {notice}
          </p>
        )}

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-navy px-5 text-sm font-semibold text-white hover:bg-navy-deep"
        >
          Update password
        </button>
      </form>
    </section>
  );
}
