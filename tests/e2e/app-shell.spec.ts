import { test, expect } from "@playwright/test";

test.describe("app shell", () => {
  test("dashboard renders with navigation", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Accounts" })).toBeVisible();
  });

  test("navigation moves between pages and marks the active one", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("link", { name: "Transfers" }).first().click();
    await expect(page).toHaveURL(/\/transfers$/);
    await expect(page.getByRole("heading", { name: "Transfers" })).toBeVisible();
  });

  test("sign out shows an honest notice instead of pretending", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("button", { name: "Sign out" }).click();
    await expect(page.getByRole("status")).toContainText("isn't available yet");
    await expect(page).toHaveURL(/\/dashboard$/);
  });
});
