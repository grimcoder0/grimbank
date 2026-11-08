"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/auth/icons";
import { PasswordField } from "@/components/auth/PasswordField";
import {
  PASSWORD_MIN_LENGTH,
  validateSignup,
  type SignupFieldErrors,
  type SignupInput,
} from "@/lib/validation/auth";
import {
  submitSignup,
  type SignupFailureReason,
} from "@/lib/auth/signup-client";

type Notice = { variant: "error" | "info"; message: string };

function noticeFor(reason: SignupFailureReason): Notice {
  switch (reason) {
    case "not_available":
      return {
        variant: "info",
        message:
          "Account creation isn't available yet. GrimBank is a development prototype and its registration system hasn't been built.",
      };
    case "network":
      return {
        variant: "error",
        message:
          "We couldn't reach the server. Check your connection and try again.",
      };
  }
}

type Values = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

const FIELD_ORDER: (keyof SignupInput)[] = [
  "fullName",
  "email",
  "password",
  "confirmPassword",
  "acceptedTerms",
];

export function SignupForm() {
  const [values, setValues] = useState<Values>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });
  const [errors, setErrors] = useState<SignupFieldErrors>({});
  const [notice, setNotice] = useState<Notice | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const refs = useRef<Partial<Record<keyof SignupInput, HTMLInputElement | null>>>(
    {},
  );

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setNotice(null);

    const result = validateSignup(values);
    if (!result.ok) {
      setErrors(result.errors);
      const first = FIELD_ORDER.find((key) => result.errors[key]);
      if (first) refs.current[first]?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const outcome = await submitSignup(result.data);
      setNotice(noticeFor(outcome.reason));
    } catch {
      setNotice(noticeFor("network"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="signin-form" onSubmit={handleSubmit} noValidate>
      {notice && (
        <p
          className={`form-note ${notice.variant === "error" ? "error" : ""}`}
          role={notice.variant === "error" ? "alert" : "status"}
        >
          <strong>{notice.variant === "error" ? "Error: " : "Notice: "}</strong>
          {notice.message}
        </p>
      )}

      <div className="field-group">
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          ref={(el) => {
            refs.current.fullName = el;
          }}
          name="fullName"
          type="text"
          autoComplete="name"
          value={values.fullName}
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          onChange={(e) => update("fullName", e.target.value)}
        />
        {errors.fullName && (
          <p id="fullName-error" className="field-error">
            {errors.fullName}
          </p>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          ref={(el) => {
            refs.current.email = el;
          }}
          name="email"
          type="email"
          inputMode="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={values.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={(e) => update("email", e.target.value)}
        />
        {errors.email && (
          <p id="email-error" className="field-error">
            {errors.email}
          </p>
        )}
      </div>

      <PasswordField
        id="password"
        name="password"
        label="Password"
        autoComplete="new-password"
        value={values.password}
        error={errors.password}
        hint={`At least ${PASSWORD_MIN_LENGTH} characters. Pasting from a password manager is fine.`}
        inputRef={(el) => {
          refs.current.password = el;
        }}
        onChange={(v) => update("password", v)}
      />

      <PasswordField
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        autoComplete="new-password"
        value={values.confirmPassword}
        error={errors.confirmPassword}
        inputRef={(el) => {
          refs.current.confirmPassword = el;
        }}
        onChange={(v) => update("confirmPassword", v)}
      />

      <div className="field-group">
        <label className="checkbox-row" htmlFor="acceptedTerms">
          <input
            id="acceptedTerms"
            ref={(el) => {
              refs.current.acceptedTerms = el;
            }}
            name="acceptedTerms"
            type="checkbox"
            checked={values.acceptedTerms}
            aria-invalid={errors.acceptedTerms ? true : undefined}
            aria-describedby={
              errors.acceptedTerms ? "acceptedTerms-error" : undefined
            }
            onChange={(e) => update("acceptedTerms", e.target.checked)}
          />
          <span>
            I agree to the{" "}
            <Link
              className="text-link"
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              className="text-link"
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.acceptedTerms && (
          <p id="acceptedTerms-error" className="field-error">
            {errors.acceptedTerms}
          </p>
        )}
      </div>

      <button
        className="submit-button"
        type="submit"
        disabled={submitting}
        aria-busy={submitting || undefined}
      >
        {submitting ? (
          "Creating account"
        ) : (
          <>
            Create account <ArrowRight />
          </>
        )}
      </button>

      <div className="signup-prompt">
        <span>Already have a GrimBank account?</span>
        <Link className="text-link" href="/login">
          Sign in <ArrowRight size={14} />
        </Link>
      </div>
    </form>
  );
}
