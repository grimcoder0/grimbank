import { test, expect } from "@playwright/test";

test.describe("login page", () => {
  test("shows the sign-in form", async ({ page }) => {
    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: "Welcome back" }),
    ).toBeVisible();
    await expect(page.getByLabel("Email address")).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  });

  test("shows validation errors for empty fields", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("Enter your email address.")).toBeVisible();
    await expect(page.getByText("Enter your password.")).toBeVisible();
  });

  test("password visibility toggle works", async ({ page }) => {
    await page.goto("/login");
    const password = page.getByLabel("Password", { exact: true });
    await password.fill("secret");
    await expect(password).toHaveAttribute("type", "password");
    await page.getByRole("button", { name: "Show password" }).click();
    await expect(password).toHaveAttribute("type", "text");
    await expect(
      page.getByRole("button", { name: "Hide password" }),
    ).toBeVisible();
  });

  test("valid input does not sign the user in", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email address").fill("user@example.com");
    await page.getByLabel("Password", { exact: true }).fill("secret");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("status")).toContainText("available yet");
    await expect(page).toHaveURL(/\/login$/);
  });
});
