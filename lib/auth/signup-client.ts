import { signUpAction } from "@/app/actions/auth";
import type { SignupInput } from "@/lib/validation/auth";

export type SignupFailureReason = "invalid" | "rejected" | "network";
export type SignupResult =
  | { ok: true }
  | { ok: false; reason: SignupFailureReason };

export async function submitSignup(input: SignupInput): Promise<SignupResult> {
  return signUpAction(input);
}
