"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff } from "@/components/auth/icons";
import { validateLogin, type LoginFieldErrors } from "@/lib/validation/auth";
import { submitLogin, type LoginFailureReason } from "@/lib/auth/login-client";

type Notice = { variant: "error" | "info"; message: string };

function noticeFor(reason: LoginFailureReason): Notice {
  switch (reason) {
    case "not_available":
      return {
        variant: "info",
        message:
          "Sign-in isn't available yet. GrimBank is a development prototype and its authentication system hasn't been built.",
      };
    case "invalid":
      return { variant: "error", message: "Incorrect email or password." };
    case "network":
      return {
        variant: "error",
        message:
          "We couldn't reach the server. Check your connection and try again.",
      };
  }
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginFieldErrors>({});
  const [notice, setNotice] = useState<Notice | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setNotice(null);

    const result = validateLogin({ email, password });
    if (!result.ok) {
      setErrors(result.errors);
      (result.errors.email ? emailRef : passwordRef).current?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const outcome = await submitLogin(result.data);
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
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          ref={emailRef}
          name="email"
          type="email"
          inputMode="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
        />
        {errors.email && (
          <p id="email-error" className="field-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field-group">
        <div className="field-label-row">
          <label htmlFor="password">Password</label>
          <Link className="text-link" href="/forgot-password">
            Forgot password?
          </Link>
        </div>
        <div className="password-wrap">
          <input
            id="password"
            ref={passwordRef}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "password-error" : undefined}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />
          <button
            className="icon-button"
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className="field-error">
            {errors.password}
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
          "Signing in"
        ) : (
          <>
            Sign in <ArrowRight />
          </>
        )}
      </button>
    </form>
  );
}
