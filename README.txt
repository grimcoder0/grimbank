GrimBank stage 7: polish (loading, empty states, phone layout)
Copy into your project root (~/grimbank). Replaces components/app/AppShell.tsx,
components/dashboard/RecentTransactions.tsx, app/(app)/accounts/page.tsx and
app/(app)/accounts/[id]/page.tsx. Adds app/(app)/loading.tsx, components/app/Skeleton.tsx,
components/app/EmptyState.tsx and tests/e2e/phone.spec.ts.
Then: npm run typecheck && npm run lint && npm test && npm run build && npm run test:e2e
