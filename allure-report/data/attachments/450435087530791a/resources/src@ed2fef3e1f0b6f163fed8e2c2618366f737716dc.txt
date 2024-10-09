import { test, expect } from "@playwright/test";
import CartPage from "../pages/cart.page";
import path from "path";

test.describe("Upload File", () => {
  let cartPage: CartPage;

  const fileName = ["testimage.jpg", "10mbfile.jpg"];

  for (const name of fileName) {
    test(`Should upload ${name} file`, async ({ page }) => {
      cartPage = new CartPage(page);

      // Open url
      await cartPage.navigate();

      // provide test file path

      const filePath = path.join(__dirname, `../data/${name}`);

      // upload test file and click submit button
      cartPage.uploadComponent().uploadFile(filePath);

      // // wait for condition
      // await page
      //   .locator("#wfu_messageblock_header_1_label_1")
      //   .waitFor({ state: "visible", timeout: 10000 });

      // assertion
      await expect(cartPage.uploadComponent().successTxt).toContainText(
        "uploaded successfully",
        { timeout: 10000 }
      );
    });
  }

  test("Should upload a test file on a hidden input field", async ({
    page,
  }) => {
    cartPage = new CartPage(page);

    // Open url
    await cartPage.navigate();

    // provide test file path
    const filePath = path.join(__dirname, "../data/testimage.jpg");

    // DOM manipulation
    await page.evaluate(() => {
      const selector = document.querySelector("#upfile_1");
      if (selector) {
        selector.className = "";
      }
    });

    // upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    // click submit button
    await page.locator("#upload_1").click();

    // assertion
    await expect(
      page.locator("#wfu_messageblock_header_1_label_1")
    ).toContainText("uploaded successfully");
  });
});
