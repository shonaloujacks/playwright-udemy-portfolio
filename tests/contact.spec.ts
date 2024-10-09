import { test, expect } from "@playwright/test";
import ContactPage from "../pages/contact.page";
import { faker } from "@faker-js/faker";

test.describe("Contact page", () => {
  let contactPage: ContactPage;
  test("Fill contact form and verify success message", async ({ page }) => {
    contactPage = new ContactPage(page);

    // open contact page
    await contactPage.navigate();

    // await page.pause();

    // Fill out the input fields and submit
    await contactPage.submitForm(
      faker.person.fullName(),
      faker.internet.email(),
      faker.phone.number(),
      faker.lorem.paragraphs(2)
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
