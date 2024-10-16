import { test, expect, APIResponse } from "@playwright/test";
import ContactPage from "../pages/contact.page";
import apiController from "../controller/api.controller";

test.describe("Contact page", () => {
  let contactPage: ContactPage;
  let randomPerson: APIResponse;

  test.beforeAll(async () => {
    await apiController.init();

    randomPerson = await apiController.getUsers();
    const newUserToDo = await apiController.createUserTodo();
    console.log(newUserToDo);
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

    await expect(contactPage.submissionTxt).toBeVisible();
  });
});
