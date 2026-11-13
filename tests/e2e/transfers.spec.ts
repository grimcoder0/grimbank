import { test, expect } from "@playwright/test";

test.describe("transfers", () => {
  test("goes from entry to review to a simulated confirmation", async ({ page }) => {
    await page.goto("/transfers");
    await page.getByLabel("Amount (USD)").fill("25.00");
    await page.getByRole("button", { name: "Review transfer" }).click();
    await expect(page.getByRole("heading", { name: "Review transfer" })).toBeVisible();
    await page.getByRole("button", { name: "Confirm transfer" }).click();
    await expect(page.getByRole("status")).toContainText("No real money moved");
  });

  test("blocks a transfer to the same account", async ({ page }) => {
    await page.goto("/transfers");
    await page.getByLabel("To", { exact: true }).selectOption("acc_everyday");
    await page.getByLabel("Amount (USD)").fill("5");
    await page.getByRole("button", { name: "Review transfer" }).click();
    await expect(page.getByText("Choose two different accounts.")).toBeVisible();
  });

  test("blocks an amount above the balance", async ({ page }) => {
    await page.goto("/transfers");
    await page.getByLabel("Amount (USD)").fill("999999");
    await page.getByRole("button", { name: "Review transfer" }).click();
    await expect(page.getByText(/more than the balance/)).toBeVisible();
  });
});
