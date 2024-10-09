import { test, expect } from "@playwright/test";
import BlogPage from "../pages/blog.page";

test.describe("Blog page", () => {
  let blogPage: BlogPage;
  test("Verify Recent Posts count and check that the minimum character length of each post item is > 10", async ({
    page,
  }) => {
    blogPage = new BlogPage(page);
    // open blog page
    await blogPage.navigate();

    // check the post count

    await expect(blogPage.recentPostsList).toHaveCount(5);

    // check that the min char length of each individual post item is > 10

    for (const el of await blogPage.recentPostsList.elementHandles()) {
      expect((await el.textContent())?.trim().length).toBeGreaterThan(10);
    }
  });
});
