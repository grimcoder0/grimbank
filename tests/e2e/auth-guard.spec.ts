import { test, expect } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test("signed-out visitors are sent from the dashboard to sign-in", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
});
