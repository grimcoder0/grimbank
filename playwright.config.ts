import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  globalSetup: "./tests/e2e/global-setup.ts",
  timeout: 120_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL: "http://localhost:3000",
    navigationTimeout: 90_000,
    // Skips the intro animation so tests don't wait on it. The animation
    // honours this setting for real users too.
    reducedMotion: "reduce",
    // Every test starts signed in. Auth tests opt out explicitly.
    storageState: "tests/e2e/.auth/user.json",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000/api/health",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
