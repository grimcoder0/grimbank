import { z } from "zod";

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Enter your email address.")
  .refine(
    (value) => z.email().safeParse(value).success,
    "Enter a valid email address.",
  );

/* ---------- Login ---------- */

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Enter your password."),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type LoginFieldErrors = Partial<Record<keyof LoginInput, string>>;

export type LoginValidation =
  | { ok: true; data: LoginInput }
  | { ok: false; errors: LoginFieldErrors };

export function validateLogin(input: {
  email: string;
  password: string;
}): LoginValidation {
  const result = loginSchema.safeParse(input);
  if (result.success) return { ok: true, data: result.data };

  const errors: LoginFieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if ((key === "email" || key === "password") && !errors[key]) {
      errors[key] = issue.message;
    }
  }
  return { ok: false, errors };
}

/* ---------- Signup ---------- */

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

export const TERMS_REQUIRED_MESSAGE =
  "Accept the Terms of Service and Privacy Policy to continue.";

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Enter your full name.")
    .max(100, "Use 100 characters or fewer."),
  email: emailField,
  password: z
    .string()
    .min(1, "Enter a password.")
    .min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters.`)
    .max(PASSWORD_MAX_LENGTH, `Use ${PASSWORD_MAX_LENGTH} characters or fewer.`),
  confirmPassword: z.string().min(1, "Confirm your password."),
  acceptedTerms: z.boolean().refine((v) => v === true, TERMS_REQUIRED_MESSAGE),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SignupFieldErrors = Partial<Record<keyof SignupInput, string>>;

export type SignupValidation =
  | { ok: true; data: SignupInput }
  | { ok: false; errors: SignupFieldErrors };

export function validateSignup(input: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}): SignupValidation {
  const result = signupSchema.safeParse(input);
  const errors: SignupFieldErrors = {};

  if (!result.success) {
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof SignupInput | undefined;
      if (key && !errors[key]) errors[key] = issue.message;
    }
  }

  if (
    !errors.confirmPassword &&
    input.confirmPassword !== "" &&
    input.password !== input.confirmPassword
  ) {
    errors.confirmPassword = "Passwords don't match.";
  }

  if (result.success && Object.keys(errors).length === 0) {
    return { ok: true, data: result.data };
  }
  return { ok: false, errors };
}
