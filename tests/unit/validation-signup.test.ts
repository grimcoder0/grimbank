import { describe, it, expect } from "vitest";
import { validateSignup } from "@/lib/validation/auth";

const valid = {
  fullName: "  Ada Lovelace ",
  email: "  Ada@Example.com ",
  password: "correct horse battery",
  confirmPassword: "correct horse battery",
  acceptedTerms: true,
};

describe("validateSignup", () => {
  it("accepts valid input and normalizes name and email", () => {
    const result = validateSignup(valid);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.fullName).toBe("Ada Lovelace");
      expect(result.data.email).toBe("ada@example.com");
    }
  });

  it("requires every field", () => {
    const result = validateSignup({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.fullName).toBe("Enter your full name.");
      expect(result.errors.email).toBe("Enter your email address.");
      expect(result.errors.password).toBe("Enter a password.");
      expect(result.errors.confirmPassword).toBe("Confirm your password.");
      expect(result.errors.acceptedTerms).toBe(
        "Accept the Terms of Service and Privacy Policy to continue.",
      );
    }
  });

  it("rejects a 7-character password", () => {
    const result = validateSignup({
      ...valid,
      password: "abcdefg",
      confirmPassword: "abcdefg",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.password).toBe("Use at least 8 characters.");
    }
  });

  it("accepts an 8-character password", () => {
    const result = validateSignup({
      ...valid,
      password: "abcdefgh",
      confirmPassword: "abcdefgh",
    });
    expect(result.ok).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = validateSignup({
      ...valid,
      confirmPassword: "something else entirely",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.confirmPassword).toBe("Passwords don't match.");
    }
  });

  it("rejects passwords over 128 characters", () => {
    const long = "a".repeat(129);
    const result = validateSignup({
      ...valid,
      password: long,
      confirmPassword: long,
    });
    expect(result.ok).toBe(false);
  });

  it("does not trim passwords", () => {
    const spaced = "  spaces around me  ";
    const result = validateSignup({
      ...valid,
      password: spaced,
      confirmPassword: spaced,
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.password).toBe(spaced);
  });

  it("requires terms acceptance", () => {
    const result = validateSignup({ ...valid, acceptedTerms: false });
    expect(result.ok).toBe(false);
  });
});
