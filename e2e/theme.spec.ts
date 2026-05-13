import { expect, test } from "@playwright/test";

test("theme toggle switches root theme attribute", async ({ page }) => {
  await page.goto("/");

  const root = page.locator("html");
  const toggle = page.locator('button[data-testid="theme-toggle"]:visible').first();
  await expect(root).toHaveAttribute("data-theme", "blue-dark");
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-label", /Switch to original theme|Switch to dark blue theme/);
});
