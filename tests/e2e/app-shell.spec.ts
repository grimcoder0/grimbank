import { test, expect } from "@playwright/test";

test.describe("app shell", () => {
  test("dashboard renders with navigation", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Accounts" }).first()).toBeVisible();
  });

  test("navigation moves between pages", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("link", { name: "Transfers" }).first().click();
    await expect(page).toHaveURL(/\/transfers$/);
    await expect(page.getByRole("heading", { name: "Transfers" })).toBeVisible();
  });

  test("sign out ends the session and returns to sign-in", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("button", { name: "Sign out" }).click();
    await expect(page).toHaveURL(/\/login$/);
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
  });
});
