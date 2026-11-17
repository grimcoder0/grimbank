import { test, expect } from "@playwright/test";
import { E2E_EMAIL, E2E_PASSWORD } from "./test-user";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("login page", () => {
  test("shows the sign-in form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
    await expect(page.getByLabel("Email address")).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  });

  test("shows validation errors for empty fields", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("Enter your email address.")).toBeVisible();
    await expect(page.getByText("Enter your password.")).toBeVisible();
  });

  test("a wrong password shows one generic error", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email address").fill(E2E_EMAIL);
    await page.getByLabel("Password", { exact: true }).fill("wrong-password-999");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("alert")).toContainText("Incorrect email or password.");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("correct details sign in and open the dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email address").fill(E2E_EMAIL);
    await page.getByLabel("Password", { exact: true }).fill(E2E_PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  });
});
