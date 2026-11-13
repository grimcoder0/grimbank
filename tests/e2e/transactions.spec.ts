import { test, expect } from "@playwright/test";

test.describe("transactions", () => {
  test("search narrows the list and updates the count", async ({ page }) => {
    await page.goto("/transactions");
    await expect(page.getByRole("status")).toContainText("Showing 7 of 7 transactions");
    await page.getByLabel("Search by description").fill("coffee");
    await expect(page.getByRole("status")).toContainText("Showing 1 of 7 transactions");
    await expect(page.getByRole("link", { name: /Coffee shop/ })).toBeVisible();
  });

  test("a search with no matches shows a clear message", async ({ page }) => {
    await page.goto("/transactions");
    await page.getByLabel("Search by description").fill("zzzz");
    await expect(page.getByText("No transactions match these filters.")).toBeVisible();
  });

  test("a row opens its detail page", async ({ page }) => {
    await page.goto("/transactions");
    await page.getByRole("link", { name: /Rideshare/ }).click();
    await expect(page).toHaveURL(/\/transactions\/txn_1$/);
    await expect(page.getByRole("heading", { name: "Rideshare" })).toBeVisible();
    await expect(page.getByRole("definition").filter({ hasText: "Pending" })).toBeVisible();
  });

  test("an unknown transaction shows a not-found page", async ({ page }) => {
    await page.goto("/transactions/does-not-exist");
    await expect(page.getByText(/could not be found/i).first()).toBeVisible();
  });
});
