import {
  sampleAccounts,
  sampleTransactions,
  type Account,
  type Transaction,
} from "@/lib/sample-data";

// Single read point for accounts. The back-end stage replaces these bodies
// with database queries; the pages below don't change.

export function listAccounts(): Account[] {
  return sampleAccounts;
}

export function getAccount(id: string): Account | undefined {
  return sampleAccounts.find((a) => a.id === id);
}

export function listAccountTransactions(accountId: string): Transaction[] {
  return sampleTransactions.filter((t) => t.accountId === accountId);
}
