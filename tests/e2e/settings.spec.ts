import { test, expect } from "@playwright/test";

test.describe("settings", () => {
  test("saving the profile shows an honest not-available notice", async ({ page }) => {
    await page.goto("/settings");
    await page.getByRole("button", { name: "Save profile" }).click();
    await expect(page.getByRole("status")).toContainText("isn't available yet");
  });

  test("an empty name shows a validation message", async ({ page }) => {
    await page.goto("/settings");
    await page.getByLabel("Full name").fill("");
    await page.getByRole("button", { name: "Save profile" }).click();
    await expect(page.getByText("Enter your name.")).toBeVisible();
  });

  test("a short new password is rejected", async ({ page }) => {
    await page.goto("/settings");
    await page.getByLabel("Current password").fill("old password");
    await page.getByLabel("New password", { exact: true }).fill("short");
    await page.getByLabel("Confirm new password").fill("short");
    await page.getByRole("button", { name: "Update password" }).click();
    await expect(page.getByText("Use at least 8 characters.")).toBeVisible();
  });

  test("mismatched new passwords are rejected", async ({ page }) => {
    await page.goto("/settings");
    await page.getByLabel("Current password").fill("old password");
    await page.getByLabel("New password", { exact: true }).fill("new password");
    await page.getByLabel("Confirm new password").fill("different one");
    await page.getByRole("button", { name: "Update password" }).click();
    await expect(page.getByText("Passwords don't match.")).toBeVisible();
  });
});
