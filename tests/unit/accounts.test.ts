import { describe, it, expect } from "vitest";
import { getAccount, listAccounts, listAccountTransactions } from "@/lib/accounts";

describe("account data helpers", () => {
  it("lists the sample accounts", () => {
    expect(listAccounts()).toHaveLength(2);
  });

  it("finds an account by id and returns undefined for unknown ids", () => {
    expect(getAccount("acc_savings")?.balanceMinor).toBe(406000);
    expect(getAccount("does-not-exist")).toBeUndefined();
  });

  it("returns only that account's transactions", () => {
    const savings = listAccountTransactions("acc_savings");
    expect(savings.length).toBeGreaterThan(0);
    expect(savings.every((t) => t.accountId === "acc_savings")).toBe(true);
  });
});
