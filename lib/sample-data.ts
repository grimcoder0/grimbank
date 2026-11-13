// SAMPLE DATA ONLY. Simulated figures that belong to no real account.
// The back-end stage replaces these imports; the screens don't change.

export type Category =
  | "Income"
  | "Bills"
  | "Groceries"
  | "Transport"
  | "Dining"
  | "Transfers";

export type Account = {
  id: string;
  name: string;
  type: "Everyday" | "Savings";
  currency: "USD";
  balanceMinor: number;
};

export type Transaction = {
  id: string;
  description: string;
  category: Category;
  amountMinor: number; // negative = money out
  currency: "USD";
  occurredOn: string; // YYYY-MM-DD
  status: "completed" | "pending";
};

export const sampleAccounts: Account[] = [
  { id: "acc_everyday", name: "Everyday account", type: "Everyday", currency: "USD", balanceMinor: 842050 },
  { id: "acc_savings", name: "Savings", type: "Savings", currency: "USD", balanceMinor: 406000 },
];

// Newest first.
export const sampleTransactions: Transaction[] = [
  { id: "txn_6", description: "Salary deposit", category: "Income", amountMinor: 320000, currency: "USD", occurredOn: "2026-11-10", status: "completed" },
  { id: "txn_5", description: "Electricity bill", category: "Bills", amountMinor: -8420, currency: "USD", occurredOn: "2026-11-09", status: "completed" },
  { id: "txn_4", description: "Grocery store", category: "Groceries", amountMinor: -6315, currency: "USD", occurredOn: "2026-11-08", status: "completed" },
  { id: "txn_3", description: "Transfer to savings", category: "Transfers", amountMinor: -50000, currency: "USD", occurredOn: "2026-11-07", status: "completed" },
  { id: "txn_2", description: "Coffee shop", category: "Dining", amountMinor: -685, currency: "USD", occurredOn: "2026-11-06", status: "completed" },
  { id: "txn_1", description: "Rideshare", category: "Transport", amountMinor: -1840, currency: "USD", occurredOn: "2026-11-05", status: "pending" },
];
