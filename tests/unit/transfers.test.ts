import { describe, it, expect } from "vitest";
import { parseAmountToMinor, validateTransfer } from "@/lib/transfers";
import { sampleAccounts } from "@/lib/sample-data";

describe("parseAmountToMinor", () => {
  it("reads whole and decimal amounts as exact cents", () => {
    expect(parseAmountToMinor("25")).toBe(2500);
    expect(parseAmountToMinor("12.5")).toBe(1250);
    expect(parseAmountToMinor("0.07")).toBe(7);
  });

  it("accepts thousands separators", () => {
    expect(parseAmountToMinor("1,000.50")).toBe(100050);
  });

  it("rejects text, too many decimals and empty input", () => {
    expect(parseAmountToMinor("abc")).toBeNull();
    expect(parseAmountToMinor("1.234")).toBeNull();
    expect(parseAmountToMinor("")).toBeNull();
  });
});

describe("validateTransfer", () => {
  const everyday = "acc_everyday";
  const savings = "acc_savings";

  it("accepts a valid transfer between two accounts", () => {
    const result = validateTransfer(
      { fromId: everyday, toId: savings, amountText: "25.00" },
      sampleAccounts,
    );
    expect(result).toEqual({ ok: true, amountMinor: 2500 });
  });

  it("rejects moving money to the same account", () => {
    const result = validateTransfer(
      { fromId: everyday, toId: everyday, amountText: "5" },
      sampleAccounts,
    );
    expect(result.ok).toBe(false);
  });

  it("rejects amounts above the source balance", () => {
    const result = validateTransfer(
      { fromId: savings, toId: everyday, amountText: "99999" },
      sampleAccounts,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.amount).toContain("more than the balance");
  });

  it("rejects zero", () => {
    const result = validateTransfer(
      { fromId: everyday, toId: savings, amountText: "0" },
      sampleAccounts,
    );
    expect(result.ok).toBe(false);
  });
});
