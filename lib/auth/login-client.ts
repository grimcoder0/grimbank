import { signInAction } from "@/app/actions/auth";
import type { LoginInput } from "@/lib/validation/auth";

export type LoginFailureReason = "invalid" | "network";
export type LoginResult =
  | { ok: true }
  | { ok: false; reason: LoginFailureReason };

export async function submitLogin(input: LoginInput): Promise<LoginResult> {
  return signInAction(input);
}
