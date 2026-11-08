import { test, expect } from "@playwright/test";

test("home page renders the prototype notice", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "GrimBank" })).toBeVisible();
  await expect(page.getByText(/Development prototype/)).toBeVisible();
});

test("health endpoint responds", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.ok()).toBeTruthy();
});
