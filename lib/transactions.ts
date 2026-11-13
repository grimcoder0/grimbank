import {
  sampleTransactions,
  type Category,
  type Transaction,
} from "@/lib/sample-data";
import { SAMPLE_TODAY } from "@/lib/sample-date";

// Single read point for transactions. The back-end stage replaces these
// bodies with database queries; the pages and components don't change.

export const CATEGORIES: Category[] = [
  "Income",
  "Bills",
  "Groceries",
  "Transport",
  "Dining",
  "Transfers",
];

export type PeriodFilter = "all" | 7 | 30;

export type TransactionFilter = {
  query: string;
  category: Category | "all";
  status: "all" | "completed" | "pending";
  period: PeriodFilter;
};

export const EMPTY_FILTER: TransactionFilter = {
  query: "",
  category: "all",
  status: "all",
  period: "all",
};

export function listTransactions(): Transaction[] {
  return sampleTransactions;
}

export function getTransaction(id: string): Transaction | undefined {
  return sampleTransactions.find((t) => t.id === id);
}

const DAY_MS = 86_400_000;

export function filterTransactions(
  transactions: Transaction[],
  filter: TransactionFilter,
  today: string = SAMPLE_TODAY,
): Transaction[] {
  const query = filter.query.trim().toLowerCase();
  const todayMs = Date.parse(today);

  return transactions.filter((t) => {
    if (query && !t.description.toLowerCase().includes(query)) return false;
    if (filter.category !== "all" && t.category !== filter.category) return false;
    if (filter.status !== "all" && t.status !== filter.status) return false;
    if (filter.period !== "all") {
      const ageDays = (todayMs - Date.parse(t.occurredOn)) / DAY_MS;
      if (ageDays > filter.period) return false;
    }
    return true;
  });
}
