import { describe, it, expect } from "vitest";
import { filterTransactions, EMPTY_FILTER } from "@/lib/transactions";
import { sampleTransactions } from "@/lib/sample-data";

describe("filterTransactions", () => {
  it("returns everything with an empty filter", () => {
    expect(filterTransactions(sampleTransactions, EMPTY_FILTER)).toHaveLength(
      sampleTransactions.length,
    );
  });

  it("matches the description case-insensitively", () => {
    const result = filterTransactions(sampleTransactions, { ...EMPTY_FILTER, query: "COFFEE" });
    expect(result.map((t) => t.description)).toEqual(["Coffee shop"]);
  });

  it("filters by category and status together", () => {
    const result = filterTransactions(sampleTransactions, {
      ...EMPTY_FILTER,
      category: "Transport",
      status: "pending",
    });
    expect(result.map((t) => t.id)).toEqual(["txn_1"]);
  });

  it("limits to the last 7 days using the fixed sample date", () => {
    // Sample today is 2026-11-14. Last 7 days covers 2026-11-07 onwards.
    const result = filterTransactions(sampleTransactions, { ...EMPTY_FILTER, period: 7 });
    expect(result.every((t) => t.occurredOn >= "2026-11-07")).toBe(true);
    expect(result.some((t) => t.occurredOn === "2026-11-05")).toBe(false);
  });
});
