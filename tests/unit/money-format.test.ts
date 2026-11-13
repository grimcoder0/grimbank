import { describe, it, expect } from "vitest";
import { formatMoney, sumMinor } from "@/lib/money/format";

describe("formatMoney", () => {
  it("formats minor units as dollars and cents", () => {
    expect(formatMoney(1248050, "USD")).toBe("$12,480.50");
    expect(formatMoney(685, "USD")).toBe("$6.85");
  });

  it("shows money out with a minus sign", () => {
    expect(formatMoney(-8420, "USD")).toBe("-$84.20");
  });

  it("rejects non-integer amounts", () => {
    expect(() => formatMoney(10.5, "USD")).toThrow();
  });
});

describe("sumMinor", () => {
  it("adds integers exactly", () => {
    expect(sumMinor([842050, 406000])).toBe(1248050);
  });

  it("rejects unsafe values", () => {
    expect(() => sumMinor([0.1, 0.2])).toThrow();
  });
});
