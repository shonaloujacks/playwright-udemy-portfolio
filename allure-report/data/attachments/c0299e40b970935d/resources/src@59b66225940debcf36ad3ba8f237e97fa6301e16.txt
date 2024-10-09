/* eslint-disable playwright/no-useless-not */
import { test, expect } from "@playwright/test";
import HomePage from "../pages/home.page";

test.describe("Home", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });
  test("Open HomePage and verify title", async ({ page }) => {
    // verify title
    await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns");
  });

  test("Open AboutPage and verify title", async ({ page }) => {
    // open url
    await page.goto("https://practice.sdetunicorns.com/about/");

    //verify title
    await expect(page).toHaveTitle("About – Practice E-Commerce Site");
  });

  test("Click get started button using CSS selector", async ({ page }) => {
    await expect(page).not.toHaveURL(/.*#get-started/);

    //click the button
    await homePage.getStartedBtn.click();

    //verify url has #get-started
    await expect(page).toHaveURL(/.*#get-started/);
  });

  test("Verify heading text is visible using text selector", async () => {
    //find the text locator
    const headingText = homePage.headingText;

    //verify that the heading text is visible
    await expect(headingText).not.toBeHidden();
    await expect(headingText).toBeVisible();
  });

  test("Verify home link is enabled using text and CSS selector", async () => {
    //find the home text
    const homeText = homePage.homeLink;

    //verify that the heading text is visible
    await expect(homeText).toBeEnabled();
  });

  test("Verify search icon is visible using xpath selector", async () => {
    //find search icon
    const searchIcon = homePage.searchIcon;

    //verify that search icon is visible
    await expect(searchIcon).toBeVisible();
  });

  test("Verify the text of all nav links", async () => {
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];

    // Or if you want to work with a individual element, you can use the nth locator to identify one element from an array:
    // const navLinks = page.locator('#zak-primary-menu li[id*=menu]').nth(3);

    // To print out all the links:

    // for (const el of await navLinks.elementHandles()) {
    //     console.log(await el.textContent());
    // }

    //verify nav links text
    expect(await homePage.getNavLinksText()).toEqual(expectedLinks);
    // and here's what you'd do if you wanted to work with an individual element: expect(await navLinks.textContent()).toEqual(expectedLinks[3]);
  });
});
