import { test, expect } from "@playwright/test";

test.describe("login intro with motion enabled", () => {
  test.use({ reducedMotion: "no-preference" });

  test("plays, then hands over a usable form", async ({ page }) => {
    await page.goto("/login");
    const root = page.locator("main.auth-intro");
    await expect(root).toHaveAttribute("data-mode", "intro");
    await expect(root).toHaveAttribute("data-done", "true", {
      timeout: 10_000,
    });
    await expect(page.getByLabel("Email address")).toBeEditable();
  });
});

test.describe("login intro with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("is skipped", async ({ page }) => {
    await page.goto("/login");
    const root = page.locator("main.auth-intro");
    await expect(root).toHaveAttribute("data-mode", "static");
    await expect(page.getByLabel("Email address")).toBeEditable();
  });
});
