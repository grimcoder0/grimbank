import type { LoginInput } from "@/lib/validation/auth";

export type LoginFailureReason = "not_available" | "invalid" | "network";
export type LoginResult = { ok: false; reason: LoginFailureReason };

// Phase 4 replaces this body with a request to the real authentication
// endpoint and adds a success result that redirects to the dashboard.
export async function submitLogin(input: LoginInput): Promise<LoginResult> {
  void input;
  return { ok: false, reason: "not_available" };
}
