GrimBank stage 3: accounts list and account detail (sample data)
Copy into your project root (~/grimbank). Replaces lib/sample-data.ts,
app/(app)/accounts/page.tsx and components/app/AppShell.tsx (one highlight fix),
and adds lib/accounts.ts, app/(app)/accounts/[id]/page.tsx and components/accounts.
Then: npm run typecheck && npm run lint && npm test && npm run build && npm run test:e2e
