"use client";

import { useState, type ReactNode, type Ref } from "react";
import { Eye, EyeOff } from "@/components/auth/icons";

type PasswordFieldProps = {
  id: string;
  name: string;
  label: string;
  autoComplete: "new-password" | "current-password";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
  labelAction?: ReactNode;
};

export function PasswordField({
  id,
  name,
  label,
  autoComplete,
  value,
  onChange,
  error,
  hint,
  placeholder,
  inputRef,
  labelAction,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="field-group">
      <div className="field-label-row">
        <label htmlFor={id}>{label}</label>
        {labelAction}
      </div>
      <div className="password-wrap">
        <input
          id={id}
          ref={inputRef}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          className="icon-button"
          type="button"
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <EyeOff /> : <Eye />}
        </button>
      </div>
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
    </div>
  );
}
