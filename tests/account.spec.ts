import { test, expect } from "@playwright/test";

test.describe("My Account", () => {
  test("Access Orders", async ({ page }) => {
    await page.goto("/my-account");
    await page.locator("li a[href*='orders']").click();
    await expect(page).toHaveURL(/.*ordersBREAK/);
  });

  test("Access Downloads", async ({ page }) => {
    await page.goto("/my-account");
    await page.locator("li a[href*='downloads']").click();
    await expect(page).toHaveURL(/.*downloads/);
  });

  test.describe("Account Page", () => {
    test.use({ storageState: "notLoggedInState.json" });
    test("Verify login and register is available", async ({ page }) => {
      await page.goto("/my-account");
      await expect(page.getByRole("button", { name: /log in/i })).toBeVisible();
      await expect(
        page.getByRole("button", { name: /register/i })
      ).toBeVisible();
    });
  });
});
