import { test, expect, type Page } from "@playwright/test";

async function login(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: /log in/i }).click();
  await page.waitForURL(/student-dashboard|admin-dashboard/, { timeout: 30_000 });
}

test.describe("Public site", () => {
  test("home loads with auth links", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.ok() || res?.status() === 304).toBeTruthy();
    await expect(page.getByRole("link", { name: /login/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /sign up/i }).first()).toBeVisible();
    await expect(page.getByText(/clinical excellence/i).first()).toBeVisible();
  });

  test("marketing routes respond", async ({ page }) => {
    for (const path of ["/courses", "/about", "/contact", "/workshops", "/resources"]) {
      const res = await page.goto(path);
      expect(res?.status(), path).toBeLessThan(500);
      await expect(page.locator("body")).not.toContainText("MIDDLEWARE_INVOCATION_FAILED");
    }
  });

  test("login page has form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.getByRole("button", { name: /log in/i })).toBeVisible();
  });

  test("signup page has form", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.locator("#fullName")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
  });

  test("protected dashboards redirect when logged out", async ({ page }) => {
    await page.goto("/student-dashboard");
    await expect(page).toHaveURL(/\/login/);
    await page.goto("/admin-dashboard");
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Student dashboard", () => {
  const email = process.env.E2E_STUDENT_EMAIL;
  const password = process.env.E2E_STUDENT_PASSWORD;

  test.skip(!email || !password, "Set E2E_STUDENT_EMAIL and E2E_STUDENT_PASSWORD");

  test("login and open student pages", async ({ page }) => {
    await login(page, email!, password!);

    const paths = [
      "/student-dashboard",
      "/student-dashboard/courses",
      "/student-dashboard/progress",
      "/student-dashboard/assignments",
      "/student-dashboard/workshops",
      "/student-dashboard/resources",
      "/student-dashboard/certificates",
      "/student-dashboard/community",
      "/student-dashboard/profile",
      "/student-dashboard/settings",
      "/student-dashboard/help",
    ];

    for (const path of paths) {
      const res = await page.goto(path);
      expect(res?.status(), path).toBeLessThan(500);
      await expect(page).toHaveURL(new RegExp(path.replace(/\//g, "\\/")));
      await expect(page.locator("body")).not.toContainText("MIDDLEWARE_INVOCATION_FAILED");
      await expect(page.locator("body")).not.toContainText("This page could not be found");
    }
  });
});

test.describe("Admin dashboard", () => {
  const email = process.env.E2E_ADMIN_EMAIL;
  const password = process.env.E2E_ADMIN_PASSWORD;

  test.skip(!email || !password, "Set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD");

  test("login and open admin pages", async ({ page }) => {
    await login(page, email!, password!);
    await page.goto("/admin-dashboard");
    await expect(page).toHaveURL(/\/admin-dashboard/);

    const paths = [
      "/admin-dashboard",
      "/admin-dashboard/courses",
      "/admin-dashboard/learners",
      "/admin-dashboard/assessments",
      "/admin-dashboard/certificates",
      "/admin-dashboard/resources",
      "/admin-dashboard/workshops",
      "/admin-dashboard/analytics",
    ];

    for (const path of paths) {
      const res = await page.goto(path);
      expect(res?.status(), path).toBeLessThan(500);
      await expect(page).toHaveURL(new RegExp(path.replace(/\//g, "\\/")));
      await expect(page.locator("body")).not.toContainText("MIDDLEWARE_INVOCATION_FAILED");
    }
  });
});
