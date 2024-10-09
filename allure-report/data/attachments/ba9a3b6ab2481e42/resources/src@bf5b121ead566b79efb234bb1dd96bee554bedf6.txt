import { Page, Locator } from "@playwright/test";

class ContactPage {
  page: Page;
  nameInputBox: Locator;
  emailInputBox: Locator;
  phoneInputBox: Locator;
  messageInputBox: Locator;
  submitBtn: Locator;
  submissionTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInputBox = page.locator(".contact-name input");
    this.emailInputBox = page.locator(".contact-email input");
    this.phoneInputBox = page.locator(".contact-phone input");
    this.messageInputBox = page.locator(".contact-message textarea");
    this.submitBtn = page.locator("button[type=submit]");
    this.submissionTxt = page.locator(
      "text=Thanks for contacting us! We will be in touch with you shortly"
    );
  }

  async navigate() {
    await this.page.goto("/contact");
  }

  async submitForm(
    name: string,
    email: string,
    phone: string,
    message: string
  ) {
    await this.nameInputBox.fill(name);
    await this.emailInputBox.fill(email);
    await this.phoneInputBox.fill(phone);
    await this.messageInputBox.fill(message);

    await this.submitBtn.click();
  }
}

export default ContactPage;
