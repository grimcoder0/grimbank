import { describe, it, expect } from "vitest";
import { validatePasswordChange, validateProfile } from "@/lib/settings";

describe("validateProfile", () => {
  it("accepts a name and a valid email", () => {
    expect(validateProfile({ name: "Ada", email: "ada@example.com" })).toEqual({ ok: true });
  });

  it("requires a name and a valid email", () => {
    const result = validateProfile({ name: "   ", email: "not-an-email" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.name).toBe("Enter your name.");
      expect(result.errors.email).toBe("Enter a valid email address.");
    }
  });
});

describe("validatePasswordChange", () => {
  const valid = { current: "old password", next: "new password", confirm: "new password" };

  it("accepts a valid change", () => {
    expect(validatePasswordChange(valid)).toEqual({ ok: true });
  });

  it("enforces the 8-character minimum", () => {
    const result = validatePasswordChange({ ...valid, next: "short", confirm: "short" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.next).toBe("Use at least 8 characters.");
  });

  it("rejects reusing the current password", () => {
    const result = validatePasswordChange({
      current: "same password",
      next: "same password",
      confirm: "same password",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.next).toContain("different");
  });

  it("rejects a mismatched confirmation", () => {
    const result = validatePasswordChange({ ...valid, confirm: "something else" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.confirm).toBe("Passwords don't match.");
  });
});
