// Authoritative amounts are integers in minor units (cents for USD).
// Floating-point is only used here, for display.

export function currencyDigits(currency: string): number {
  return (
    new Intl.NumberFormat("en-US", { style: "currency", currency }).resolvedOptions()
      .maximumFractionDigits ?? 2
  );
}

export function sumMinor(values: number[]): number {
  let total = 0;
  for (const value of values) {
    if (!Number.isSafeInteger(value)) {
      throw new Error("Money values must be safe integers in minor units.");
    }
    total += value;
  }
  if (!Number.isSafeInteger(total)) {
    throw new Error("Total is outside the safe integer range.");
  }
  return total;
}

export function formatMoney(amountMinor: number, currency: string): string {
  if (!Number.isInteger(amountMinor)) {
    throw new Error("Amount must be an integer number of minor units.");
  }
  const digits = currencyDigits(currency);
  const major = amountMinor / 10 ** digits;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(major);
}
