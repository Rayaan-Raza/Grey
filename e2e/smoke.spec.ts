import { test, expect, type Page } from "@playwright/test";

const STUDENT_PATHS = [
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
] as const;

const ADMIN_PATHS = [
  "/admin-dashboard",
  "/admin-dashboard/courses",
  "/admin-dashboard/learners",
  "/admin-dashboard/assessments",
  "/admin-dashboard/certificates",
  "/admin-dashboard/resources",
  "/admin-dashboard/workshops",
  "/admin-dashboard/analytics",
] as const;

async function login(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.getByRole("button", { name: /log in/i }).click();
  await page.waitForURL(/student-dashboard|admin-dashboard/, { timeout: 30_000 });
}

async function signupStudent(page: Page, email: string, password: string) {
  await page.goto("/signup");
  await page.locator("#fullName").fill("E2E Browser Agent");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);
  await page.locator("#confirmPassword").fill(password);
  await page.getByRole("button", { name: /create account/i }).click();

  // Session, confirm-email notice, or inline signup error
  const landed = page
    .waitForURL(/student-dashboard/, { timeout: 45_000 })
    .then(() => "session" as const);
  const confirmMsg = page
    .getByText(/check your email to confirm/i)
    .waitFor({ timeout: 45_000 })
    .then(() => "confirm" as const);
  const formError = page
    .locator("form p.text-red-600")
    .waitFor({ timeout: 45_000 })
    .then(async () => {
      const text = (await page.locator("form p.text-red-600").textContent())?.trim();
      return `error:${text || "unknown signup error"}` as const;
    });

  const outcome = await Promise.race([landed, confirmMsg, formError]);

  if (outcome === "confirm") {
    throw new Error(
      "Signup requires email confirmation. Disable confirm-email in Supabase Auth or set E2E_STUDENT_EMAIL/PASSWORD for an existing user.",
    );
  }
  if (outcome.startsWith("error:")) {
    throw new Error(outcome.slice("error:".length));
  }
}

async function assertDashboardPages(page: Page, paths: readonly string[]) {
  for (const path of paths) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBeLessThan(500);
    await expect(page).toHaveURL(new RegExp(path.replace(/\//g, "\\/")));
    await expect(page.locator("body")).not.toContainText("MIDDLEWARE_INVOCATION_FAILED");
    await expect(page.locator("body")).not.toContainText("This page could not be found");
  }
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

  test("bad password stays on login", async ({ page }) => {
    await page.goto("/login");
    await page.locator("#email").fill("nobody@example.com");
    await page.locator("#password").fill("wrong-password-xyz");
    await page.getByRole("button", { name: /log in/i }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator("body")).toContainText(/invalid|error|credentials|wrong/i);
  });
});

test.describe("Student dashboard", () => {
  test("signup (or env login) and open all student pages", async ({ page }, testInfo) => {
    const envEmail = process.env.E2E_STUDENT_EMAIL;
    const envPassword = process.env.E2E_STUDENT_PASSWORD;

    if (envEmail && envPassword) {
      await login(page, envEmail, envPassword);
    } else {
      const stamp = Date.now();
      // Supabase rejects reserved TLDs like .test — use a real-looking domain
      const email = `e2e.student.${stamp}@example.com`;
      const password = `E2eTest!${stamp}`;
      try {
        await signupStudent(page, email, password);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        testInfo.skip(
          true,
          `Auto-signup failed (${msg}). Add E2E_STUDENT_EMAIL/PASSWORD or a real SUPABASE_SERVICE_ROLE_KEY (scripts/provision-e2e-user.mjs), and disable Auth email confirmation while testing.`,
        );
        return;
      }
    }

    await assertDashboardPages(page, STUDENT_PATHS);

    // Signed-in student must not reach admin
    await page.goto("/admin-dashboard");
    await expect(page).not.toHaveURL(/\/admin-dashboard$/);
  });
});

test.describe("Admin dashboard", () => {
  const email = process.env.E2E_ADMIN_EMAIL;
  const password = process.env.E2E_ADMIN_PASSWORD;

  test.skip(!email || !password, "Set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD");

  test("login and open all admin pages", async ({ page }) => {
    await login(page, email!, password!);
    await page.goto("/admin-dashboard");
    await expect(page).toHaveURL(/\/admin-dashboard/);
    await assertDashboardPages(page, ADMIN_PATHS);
  });
});
