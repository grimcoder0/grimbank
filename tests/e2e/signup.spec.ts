import { test, expect } from "@playwright/test";

const termsCheckbox = /I agree to the Terms/;

async function fillValid(page: import("@playwright/test").Page) {
  await page.getByLabel("Full name").fill("Ada Lovelace");
  await page.getByLabel("Email address").fill("ada@example.com");
  await page.getByLabel("Password", { exact: true }).fill("correct horse battery");
  await page.getByLabel("Confirm password", { exact: true }).fill("correct horse battery");
}

test.describe("signup page", () => {
  test("shows the registration form with an unchecked terms box", async ({ page }) => {
    await page.goto("/signup");
    await expect(
      page.getByRole("heading", { name: "Create your account" }),
    ).toBeVisible();
    await expect(page.getByLabel("Full name")).toBeVisible();
    await expect(page.getByLabel("Email address")).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Confirm password", { exact: true })).toBeVisible();
    await expect(page.getByLabel(termsCheckbox)).not.toBeChecked();
  });

  test("shows validation errors for an empty form", async ({ page }) => {
    await page.goto("/signup");
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page.getByText("Enter your full name.")).toBeVisible();
    await expect(page.getByText("Enter your email address.")).toBeVisible();
    await expect(page.getByText("Enter a password.")).toBeVisible();
    await expect(page.getByText("Confirm your password.")).toBeVisible();
    await expect(
      page.getByText("Accept the Terms of Service and Privacy Policy to continue."),
    ).toBeVisible();
  });

  test("rejects a password under 8 characters", async ({ page }) => {
    await page.goto("/signup");
    await page.getByLabel("Full name").fill("Ada Lovelace");
    await page.getByLabel("Email address").fill("ada@example.com");
    await page.getByLabel("Password", { exact: true }).fill("short");
    await page.getByLabel("Confirm password", { exact: true }).fill("short");
    await page.getByLabel(termsCheckbox).check();
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page.getByText("Use at least 8 characters.")).toBeVisible();
  });

  test("rejects mismatched passwords", async ({ page }) => {
    await page.goto("/signup");
    await fillValid(page);
    await page.getByLabel("Confirm password", { exact: true }).fill("a different password");
    await page.getByLabel(termsCheckbox).check();
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page.getByText("Passwords don't match.")).toBeVisible();
  });

  test("valid input does not create an account", async ({ page }) => {
    await page.goto("/signup");
    await fillValid(page);
    await page.getByLabel(termsCheckbox).check();
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page.getByRole("status")).toContainText("available yet");
    await expect(page).toHaveURL(/\/signup$/);
  });

  test("links to the sign-in page", async ({ page }) => {
    await page.goto("/signup");
    await page.getByRole("link", { name: /Sign in/ }).click();
    await expect(page).toHaveURL(/\/login$/);
  });
});

test.describe("legal pages", () => {
  for (const [path, heading] of [
    ["/terms", "Terms of Service"],
    ["/privacy", "Privacy Policy"],
  ] as const) {
    test(`${path} renders and is marked as a draft`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
      await expect(page.getByRole("note")).toContainText("Draft placeholder");
    });
  }
});
