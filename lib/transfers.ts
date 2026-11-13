import type { Account } from "@/lib/sample-data";

// Simulated transfers between the user's own accounts only.
// Nothing is sent to other people and no real money moves.
// The back-end stage replaces this with a server-side ledger write.

export type TransferErrors = Partial<Record<"fromId" | "toId" | "amount", string>>;

export type TransferValidation =
  | { ok: true; amountMinor: number }
  | { ok: false; errors: TransferErrors };

// Converts "25", "25.5", "1,000.50" into minor units (cents) without floats.
// Returns null when the text isn't a valid amount with at most two decimals.
export function parseAmountToMinor(text: string): number | null {
  const cleaned = text.trim().replace(/,/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const [whole, fraction = ""] = cleaned.split(".");
  const minor = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return Number.isSafeInteger(minor) ? minor : null;
}

export function validateTransfer(
  input: { fromId: string; toId: string; amountText: string },
  accounts: Account[],
): TransferValidation {
  const errors: TransferErrors = {};
  const from = accounts.find((a) => a.id === input.fromId);
  const to = accounts.find((a) => a.id === input.toId);

  if (!from) errors.fromId = "Choose the account to move money from.";
  if (!to) errors.toId = "Choose the account to move money to.";
  if (from && to && from.id === to.id) {
    errors.toId = "Choose two different accounts.";
  }

  const amountMinor = parseAmountToMinor(input.amountText);
  if (amountMinor === null) {
    errors.amount = "Enter an amount such as 25.00, using up to two decimals.";
  } else if (amountMinor <= 0) {
    errors.amount = "Enter an amount greater than zero.";
  } else if (from && amountMinor > from.balanceMinor) {
    errors.amount = "This is more than the balance in the account you're moving money from.";
  }

  if (Object.keys(errors).length > 0 || amountMinor === null) {
    return { ok: false, errors };
  }
  return { ok: true, amountMinor };
}
