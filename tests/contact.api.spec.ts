import { test, expect, APIRequestContext, APIResponse } from "@playwright/test";
import ContactPage from "../pages/contact.page";

test.describe("Contact page", () => {
  let contactPage: ContactPage;
  let fakerApi: APIRequestContext;
  let randomPerson: APIResponse;

  test.beforeAll(async ({ playwright }) => {
    fakerApi = await playwright.request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com/",
    });

    const response = await fakerApi.get("users");
    const responseBody = await response.json();
    randomPerson = responseBody[0];
  });

  test("Fill contact form and verify success message", async ({ page }) => {
    contactPage = new ContactPage(page);

    // open contact page
    await contactPage.navigate();

    // await page.pause();

    // Fill out the input fields and submit
    await contactPage.submitForm(
      randomPerson["name"],
      randomPerson["email"],
      randomPerson["phone"],
      randomPerson["website"]
    );

    // // Add a soft assertion
    // await expect
    //   .soft(contactPage.messageInputBox))
    //   .toHaveText("Failed test message");

    // Helpful way to stop test execution if there are any failures by this point:
    // expect(test.info().errors.length).toBeLessThan(1);

    // Verify the success message

    await expect(contactPage.submissionTxt).toBeVisible();

    //could also use:
    //     //await expect(submissionText).toHaveText('text=Thanks for contacting us! We will be in touch with you shortly');
  });
});
