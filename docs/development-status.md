# Development status

| Feature | Status |
|---|---|
| Project foundation (Next.js, TS, Tailwind, tokens) | Implemented |
| Health endpoint | Implemented, unit test written |
| Login UI (with intro animation) | Implemented (UI only, no authentication) |
| Signup UI | Implemented (UI only, no account creation) |
| Terms and Privacy pages | Draft placeholders only. Not legally reviewed, not in force |
| Authentication backend | Not started (planned: Better Auth + Prisma 7 + Postgres) |
| Database | Not started |
| Dashboard | Not started |
| Accounts / transactions | Not started |
| Simulated transfers | Not started |
| External payment integrations | Not started (requires provider, approvals) |

Product mode: simulated data only. Not a licensed bank.

Known: npm audit reports high-severity findings in the eslint-config-next
dev-tooling chain. Revisit in Phase 10.

Nothing in this status table counts as "tested" until the checks have been
run on the machine: lint, typecheck, unit tests, build, e2e.
