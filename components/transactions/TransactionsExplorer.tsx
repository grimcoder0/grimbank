"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CATEGORIES,
  EMPTY_FILTER,
  filterTransactions,
  type PeriodFilter,
  type TransactionFilter,
} from "@/lib/transactions";
import type { Transaction } from "@/lib/sample-data";
import { formatMoney } from "@/lib/money/format";
import { formatShortDate } from "@/lib/format-date";

const fieldClasses =
  "h-11 w-full rounded-lg border border-cream-line bg-cream-field px-3 text-sm text-ink";

export function TransactionsExplorer({ transactions }: { transactions: Transaction[] }) {
  const [filter, setFilter] = useState<TransactionFilter>(EMPTY_FILTER);
  const results = useMemo(() => filterTransactions(transactions, filter), [transactions, filter]);

  function update<K extends keyof TransactionFilter>(key: K, value: TransactionFilter[K]) {
    setFilter((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="space-y-5">
      <form
        role="search"
        className="grid gap-4 rounded-xl border border-cream-line bg-cream-field p-5 md:grid-cols-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="md:col-span-2">
          <label htmlFor="tx-search" className="mb-1.5 block text-xs font-semibold text-ink">
            Search by description
          </label>
          <input
            id="tx-search"
            type="search"
            value={filter.query}
            onChange={(e) => update("query", e.target.value)}
            placeholder="For example, coffee"
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="tx-category" className="mb-1.5 block text-xs font-semibold text-ink">
            Category
          </label>
          <select
            id="tx-category"
            value={filter.category}
            onChange={(e) => update("category", e.target.value as TransactionFilter["category"])}
            className={fieldClasses}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tx-period" className="mb-1.5 block text-xs font-semibold text-ink">
            Period
          </label>
          <select
            id="tx-period"
            value={String(filter.period)}
            onChange={(e) => {
              const value = e.target.value;
              update("period", (value === "all" ? "all" : Number(value)) as PeriodFilter);
            }}
            className={fieldClasses}
          >
            <option value="all">All time</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>

        <div>
          <label htmlFor="tx-status" className="mb-1.5 block text-xs font-semibold text-ink">
            Status
          </label>
          <select
            id="tx-status"
            value={filter.status}
            onChange={(e) => update("status", e.target.value as TransactionFilter["status"])}
            className={fieldClasses}
          >
            <option value="all">All statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </form>

      <p role="status" className="text-sm text-ink-secondary">
        Showing {results.length} of {transactions.length} transactions
      </p>

      {results.length === 0 ? (
        <p className="rounded-xl border border-cream-line bg-cream-field p-6 text-base text-ink-secondary">
          No transactions match these filters.
        </p>
      ) : (
        <ul className="divide-y divide-cream-line overflow-hidden rounded-xl border border-cream-line bg-cream-field">
          {results.map((t) => (
            <li key={t.id}>
              <Link
                href={`/transactions/${t.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-white"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{t.description}</p>
                  <p className="text-xs text-ink-secondary">
                    {t.category} · {formatShortDate(t.occurredOn)}
                    {t.status === "pending" && " · Pending"}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold tabular-nums text-ink">
                  {formatMoney(t.amountMinor, t.currency)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
