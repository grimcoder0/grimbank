import { describe, it, expect } from "vitest";
import { validateLogin } from "@/lib/validation/auth";

describe("validateLogin", () => {
  it("accepts valid input and trims the email", () => {
    const result = validateLogin({
      email: "  user@example.com ",
      password: "secret",
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.email).toBe("user@example.com");
  });

  it("requires both fields", () => {
    const result = validateLogin({ email: "", password: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.email).toBe("Enter your email address.");
      expect(result.errors.password).toBe("Enter your password.");
    }
  });

  it("rejects a malformed email", () => {
    const result = validateLogin({ email: "not-an-email", password: "x" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.email).toBe("Enter a valid email address.");
    }
  });

  it("does not trim passwords", () => {
    const result = validateLogin({ email: "user@example.com", password: "  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.password).toBe("  ");
  });
});
