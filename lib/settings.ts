import { z } from "zod";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/lib/validation/auth";

export type ProfileErrors = Partial<Record<"name" | "email", string>>;
export type PasswordErrors = Partial<Record<"current" | "next" | "confirm", string>>;

export type ValidationResult<E> = { ok: true } | { ok: false; errors: E };

const emailSchema = z.email();

export function validateProfile(input: {
  name: string;
  email: string;
}): ValidationResult<ProfileErrors> {
  const errors: ProfileErrors = {};
  const name = input.name.trim();
  if (name.length === 0) errors.name = "Enter your name.";
  else if (name.length > 100) errors.name = "Use 100 characters or fewer.";

  if (!emailSchema.safeParse(input.email.trim()).success) {
    errors.email = "Enter a valid email address.";
  }

  return Object.keys(errors).length === 0 ? { ok: true } : { ok: false, errors };
}

export function validatePasswordChange(input: {
  current: string;
  next: string;
  confirm: string;
}): ValidationResult<PasswordErrors> {
  const errors: PasswordErrors = {};

  if (input.current.length === 0) {
    errors.current = "Enter your current password.";
  }

  if (input.next.length < PASSWORD_MIN_LENGTH) {
    errors.next = `Use at least ${PASSWORD_MIN_LENGTH} characters.`;
  } else if (input.next.length > PASSWORD_MAX_LENGTH) {
    errors.next = `Use ${PASSWORD_MAX_LENGTH} characters or fewer.`;
  } else if (input.next === input.current && input.current.length > 0) {
    errors.next = "Choose a password different from your current one.";
  }

  if (input.confirm !== input.next) {
    errors.confirm = "Passwords don't match.";
  }

  return Object.keys(errors).length === 0 ? { ok: true } : { ok: false, errors };
}
