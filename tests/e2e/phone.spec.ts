import { test, expect } from "@playwright/test";

const pages = [
  "/dashboard",
  "/accounts",
  "/accounts/acc_savings",
  "/transactions",
  "/transactions/txn_1",
  "/transfers",
  "/settings",
];

test.describe("phone layout", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  for (const path of pages) {
    test(`${path} does not scroll sideways`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test("shows the bottom bar and hides the sidebar", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("navigation", { name: "Primary mobile" })).toBeVisible();
    await expect(page.locator('aside[aria-label="Primary"]')).toBeHidden();
  });
});
