import { describe, it, expect } from "vitest";
import { sampleAccounts, sampleTransactions } from "@/lib/sample-data";
import { spendingByCategory } from "@/components/dashboard/spending";
import { sumMinor } from "@/lib/money/format";

describe("sample dashboard data", () => {
  it("total balance equals the sum of accounts", () => {
    expect(sumMinor(sampleAccounts.map((a) => a.balanceMinor))).toBe(1248050);
  });

  it("spending excludes income and internal transfers", () => {
    const categories = spendingByCategory(sampleTransactions).map((s) => s.category);
    expect(categories).not.toContain("Income");
    expect(categories).not.toContain("Transfers");
  });

  it("spending is sorted largest first", () => {
    const spend = spendingByCategory(sampleTransactions);
    expect(spend[0]).toEqual({ category: "Bills", amountMinor: 8420 });
    for (let i = 1; i < spend.length; i++) {
      expect(spend[i - 1].amountMinor).toBeGreaterThanOrEqual(spend[i].amountMinor);
    }
  });
});
