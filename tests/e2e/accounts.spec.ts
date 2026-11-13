import { test, expect } from "@playwright/test";

test.describe("accounts", () => {
  test("list links to an account detail page", async ({ page }) => {
    await page.goto("/accounts");
    await page.getByRole("link", { name: /Savings/ }).first().click();
    await expect(page).toHaveURL(/\/accounts\/acc_savings$/);
    await expect(page.getByRole("heading", { name: "Savings", exact: true })).toBeVisible();
    await expect(page.getByRole("region", { name: "Savings account · Balance" }).getByText("$4,060.00")).toBeVisible();
  });

  test("an unknown account shows a not-found page", async ({ page }) => {
    await page.goto("/accounts/does-not-exist");
    await expect(page.getByText(/could not be found/i).first()).toBeVisible();
  });
});
