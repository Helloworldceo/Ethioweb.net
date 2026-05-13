import { expect, test } from "@playwright/test";

test("homepage hero and conversion CTA are visible", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Get found faster");
  await expect(page.getByRole("link", { name: /Create Your Profile/i })).toBeVisible();
  await expect(page.getByText("Build your digital identity in 3 steps")).toBeVisible();
});

test("contact page has accessible form labels", async ({ page }) => {
  await page.goto("/contact");

  await expect(page.locator("#contact-name")).toBeVisible();
  await expect(page.locator("#contact-email")).toBeVisible();
  await expect(page.locator("#contact-message")).toBeVisible();
});
