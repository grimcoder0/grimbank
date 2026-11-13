GrimBank stage 4: transactions list (search and filters) and detail page
Copy into your project root (~/grimbank). Replaces lib/format-date.ts and
app/(app)/transactions/page.tsx; adds lib/transactions.ts, lib/sample-date.ts,
components/transactions and app/(app)/transactions/[id].
Then: npm run typecheck && npm run lint && npm test && npm run build && npm run test:e2e
