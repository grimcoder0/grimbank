GrimBank stage 4B: real signup, login, protected pages and sign-out
Copy into your project root (~/grimbank). Overwrites the auth forms, the (app)
layout, AppShell, playwright.config.ts and the auth tests. Adds app/actions/auth.ts,
lib/auth/client.ts and tests/e2e/global-setup.ts.
Before copying: add the TermsAcceptance model to prisma/schema.prisma and run the migration.
