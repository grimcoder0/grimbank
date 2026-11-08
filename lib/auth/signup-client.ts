import type { SignupInput } from "@/lib/validation/auth";

export type SignupFailureReason = "not_available" | "network";
export type SignupResult = { ok: false; reason: SignupFailureReason };

// Phase 4 replaces this body with a request to the real registration
// endpoint and adds a success result that moves to email verification.
export async function submitSignup(input: SignupInput): Promise<SignupResult> {
  void input;
  return { ok: false, reason: "not_available" };
}
