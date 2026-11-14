"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { PRIVACY_VERSION, TERMS_VERSION } from "@/lib/legal/versions";
import {
  validateLogin,
  validateSignup,
  type LoginInput,
  type SignupInput,
} from "@/lib/validation/auth";

// Everything here re-validates on the server. The browser's checks are
// convenience only and are never trusted.

export type SignUpOutcome =
  | { ok: true }
  | { ok: false; reason: "invalid" | "rejected" };

export type SignInOutcome =
  | { ok: true }
  | { ok: false; reason: "invalid" };

export async function signUpAction(input: SignupInput): Promise<SignUpOutcome> {
  const checked = validateSignup(input);
  if (!checked.ok) return { ok: false, reason: "invalid" };

  const { fullName, email, password } = checked.data;

  let userId: string;
  try {
    const result = await auth.api.signUpEmail({
      body: { name: fullName, email, password },
      headers: await headers(),
    });
    userId = result.user.id;
  } catch (error) {
    console.error("[signup] Better Auth rejected the request:", error);
    // Deliberately vague: the same message covers duplicate emails and
    // other rejections, so the form doesn't reveal which emails exist.
    return { ok: false, reason: "rejected" };
  }

  // The server records the document versions and the time, never the browser.
  await prisma.termsAcceptance.create({
    data: {
      userId,
      termsVersion: TERMS_VERSION,
      privacyVersion: PRIVACY_VERSION,
    },
  });

  return { ok: true };
}

export async function signInAction(input: LoginInput): Promise<SignInOutcome> {
  const checked = validateLogin(input);
  if (!checked.ok) return { ok: false, reason: "invalid" };

  try {
    await auth.api.signInEmail({
      body: { email: checked.data.email, password: checked.data.password },
      headers: await headers(),
    });
    return { ok: true };
  } catch (error) {
    console.error("[signin] Better Auth rejected the request:", error);
    // One message for every failure, so attackers can't tell which emails exist.
    return { ok: false, reason: "invalid" };
  }
}
