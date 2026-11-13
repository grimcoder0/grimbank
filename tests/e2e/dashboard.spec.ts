import { test, expect } from "@playwright/test";

test.describe("dashboard", () => {
  test("shows the clearly labelled sample figures", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByText(/Sample data/).first()).toBeVisible();
    await expect(page.getByText("Total balance")).toBeVisible();
    await expect(page.getByText("$12,480.50")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recent transactions" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Spending by category" })).toBeVisible();
  });
});
