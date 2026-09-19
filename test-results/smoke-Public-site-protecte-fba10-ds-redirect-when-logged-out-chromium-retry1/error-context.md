# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Public site >> protected dashboards redirect when logged out
- Location: e2e\smoke.spec.ts:42:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/login/
Received string:  "https://grey-coral.vercel.app/student-dashboard"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    33 × locator resolved to <html lang="en">…</html>
       - unexpected value "https://grey-coral.vercel.app/student-dashboard"

```

```yaml
- complementary:
  - link "Grey Dental home":
    - /url: /student-dashboard
    - img "The Grey Dental"
  - paragraph: Main Menu
  - navigation:
    - link "Dashboard":
      - /url: /student-dashboard
    - link "My Courses":
      - /url: /student-dashboard/courses
    - link "Learning Progress":
      - /url: /student-dashboard/progress
    - link "Assignments":
      - /url: /student-dashboard/assignments
    - link "Certificates":
      - /url: /student-dashboard/certificates
    - link "Community":
      - /url: /student-dashboard/community
    - link "Workshops":
      - /url: /student-dashboard/workshops
    - link "Resources":
      - /url: /student-dashboard/resources
    - link "Profile":
      - /url: /student-dashboard/profile
    - link "Settings":
      - /url: /student-dashboard/settings
  - link "? Help Center":
    - /url: /student-dashboard/help
  - link "Logout":
    - /url: /login
- banner:
  - text: Search
  - searchbox "Search"
  - button "Notifications"
  - button "Messages"
  - img "Dr. Sarah"
- heading "Welcome Back, Dr. Sarah!" [level=1]
- paragraph: Continue building your clinical skills and stay on track with your learning journey.
- link "Resume Learning":
  - /url: /courses
- link "Browse Courses":
  - /url: /courses
- complementary:
  - article:
    - heading "Upcoming Deadlines" [level=2]
    - text: "3"
    - list:
      - listitem: Module Quiz Endodontics Ch.7 Friday
      - listitem: Workbook Submission Clinical workbook Aug 12
      - listitem: Live Q&A Session Office hours Saturday
- article:
  - text: Enrolled Courses
  - paragraph: "03"
  - paragraph: Active learning programs
- link "Overall Progress 70% Average course completion":
  - /url: /student-dashboard/progress
  - text: Overall Progress
  - paragraph: 70%
  - paragraph: Average course completion
- article:
  - text: Learning Hours
  - paragraph: "18.5"
  - paragraph: +3.2h this week
- link "Certificates 02 1 ready to claim Earned Earned":
  - /url: /student-dashboard/certificates
  - text: Certificates
  - paragraph: "02"
  - paragraph: 1 ready to claim
  - text: Earned Earned
- heading "Continue Learning" [level=2]
- link "See All":
  - /url: /student-dashboard/courses
- article:
  - img "Endodontics Foundation course"
  - text: Clinical
  - heading "Endodontics Foundation" [level=3]
  - paragraph: Dr. John Smith
  - paragraph: Clinical Demo Video
  - text: 70% ~3h remaining Chapter 7 of 10
  - link "Details":
    - /url: /courses/endodontics-remote
  - link "Resume":
    - /url: /courses/endodontics-remote
- heading "My Courses" [level=2]
- link "View All →":
  - /url: /student-dashboard/courses
- article:
  - img "Endodontics Foundation"
  - heading "Endodontics Foundation" [level=3]
  - paragraph: Remote Learning
  - text: 70%
  - link "Continue Learning":
    - /url: /courses/endodontics-remote
- article:
  - img "Foundations of Endodontics"
  - heading "Foundations of Endodontics" [level=3]
  - paragraph: Immersive Residency
  - text: 45%
  - link "Continue Learning":
    - /url: /courses/endodontics-residency
- article:
  - heading "Certificates Ready" [level=2]
  - paragraph: “Remote Learning Clinical Endodontics” has been issued.
  - link "Download PDF":
    - /url: /student-dashboard/certificates
- article:
  - heading "Community Activity" [level=2]
  - list:
    - listitem: Dr. John Smith Started a discussion in Implantology 10m ago
    - listitem: You Received case feedback on Case 12 1h ago
    - listitem: Editor Board Invited you to the live Implantology session Yesterday
- heading "Quick Actions" [level=2]
- link "Join Community":
  - /url: /student-dashboard/community
- link "Download Certificate":
  - /url: /student-dashboard/certificates
- link "Book Workshop":
  - /url: /student-dashboard/workshops
- link "Ask Instructor":
  - /url: /contact
- link "Browse Resources":
  - /url: /student-dashboard/resources
- link "View Assignments":
  - /url: /student-dashboard/assignments
- heading "Learning Activity" [level=2]
- link "View all →":
  - /url: /student-dashboard/progress
- text: "8 6 4 2 0 Mon Tue Wed Thu Fri Sat Sun Peak: Sat 4.5h 18.5h total"
- heading "Recent Achievements" [level=2]
- list:
  - listitem: Completed Module 5 Aug 1 Passed final clinical validation with 95% score.
  - listitem: Earned Clinical Badge Jul 28 Recognized for micro-surgery case precision.
  - listitem: Certificate Issued Jul 20 Completed Dental Restoration Track successfully.
- alert
```

# Test source

```ts
  1   | import { test, expect, type Page } from "@playwright/test";
  2   | 
  3   | async function login(page: Page, email: string, password: string) {
  4   |   await page.goto("/login");
  5   |   await page.locator("#email").fill(email);
  6   |   await page.locator("#password").fill(password);
  7   |   await page.getByRole("button", { name: /log in/i }).click();
  8   |   await page.waitForURL(/student-dashboard|admin-dashboard/, { timeout: 30_000 });
  9   | }
  10  | 
  11  | test.describe("Public site", () => {
  12  |   test("home loads with auth links", async ({ page }) => {
  13  |     const res = await page.goto("/");
  14  |     expect(res?.ok() || res?.status() === 304).toBeTruthy();
  15  |     await expect(page.getByRole("link", { name: /login/i }).first()).toBeVisible();
  16  |     await expect(page.getByRole("link", { name: /sign up/i }).first()).toBeVisible();
  17  |     await expect(page.getByText(/clinical excellence/i).first()).toBeVisible();
  18  |   });
  19  | 
  20  |   test("marketing routes respond", async ({ page }) => {
  21  |     for (const path of ["/courses", "/about", "/contact", "/workshops", "/resources"]) {
  22  |       const res = await page.goto(path);
  23  |       expect(res?.status(), path).toBeLessThan(500);
  24  |       await expect(page.locator("body")).not.toContainText("MIDDLEWARE_INVOCATION_FAILED");
  25  |     }
  26  |   });
  27  | 
  28  |   test("login page has form", async ({ page }) => {
  29  |     await page.goto("/login");
  30  |     await expect(page.locator("#email")).toBeVisible();
  31  |     await expect(page.locator("#password")).toBeVisible();
  32  |     await expect(page.getByRole("button", { name: /log in/i })).toBeVisible();
  33  |   });
  34  | 
  35  |   test("signup page has form", async ({ page }) => {
  36  |     await page.goto("/signup");
  37  |     await expect(page.locator("#fullName")).toBeVisible();
  38  |     await expect(page.locator("#email")).toBeVisible();
  39  |     await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
  40  |   });
  41  | 
  42  |   test("protected dashboards redirect when logged out", async ({ page }) => {
  43  |     await page.goto("/student-dashboard");
> 44  |     await expect(page).toHaveURL(/\/login/);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  45  |     await page.goto("/admin-dashboard");
  46  |     await expect(page).toHaveURL(/\/login/);
  47  |   });
  48  | });
  49  | 
  50  | test.describe("Student dashboard", () => {
  51  |   const email = process.env.E2E_STUDENT_EMAIL;
  52  |   const password = process.env.E2E_STUDENT_PASSWORD;
  53  | 
  54  |   test.skip(!email || !password, "Set E2E_STUDENT_EMAIL and E2E_STUDENT_PASSWORD");
  55  | 
  56  |   test("login and open student pages", async ({ page }) => {
  57  |     await login(page, email!, password!);
  58  | 
  59  |     const paths = [
  60  |       "/student-dashboard",
  61  |       "/student-dashboard/courses",
  62  |       "/student-dashboard/progress",
  63  |       "/student-dashboard/assignments",
  64  |       "/student-dashboard/workshops",
  65  |       "/student-dashboard/resources",
  66  |       "/student-dashboard/certificates",
  67  |       "/student-dashboard/community",
  68  |       "/student-dashboard/profile",
  69  |       "/student-dashboard/settings",
  70  |       "/student-dashboard/help",
  71  |     ];
  72  | 
  73  |     for (const path of paths) {
  74  |       const res = await page.goto(path);
  75  |       expect(res?.status(), path).toBeLessThan(500);
  76  |       await expect(page).toHaveURL(new RegExp(path.replace(/\//g, "\\/")));
  77  |       await expect(page.locator("body")).not.toContainText("MIDDLEWARE_INVOCATION_FAILED");
  78  |       await expect(page.locator("body")).not.toContainText("This page could not be found");
  79  |     }
  80  |   });
  81  | });
  82  | 
  83  | test.describe("Admin dashboard", () => {
  84  |   const email = process.env.E2E_ADMIN_EMAIL;
  85  |   const password = process.env.E2E_ADMIN_PASSWORD;
  86  | 
  87  |   test.skip(!email || !password, "Set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD");
  88  | 
  89  |   test("login and open admin pages", async ({ page }) => {
  90  |     await login(page, email!, password!);
  91  |     await page.goto("/admin-dashboard");
  92  |     await expect(page).toHaveURL(/\/admin-dashboard/);
  93  | 
  94  |     const paths = [
  95  |       "/admin-dashboard",
  96  |       "/admin-dashboard/courses",
  97  |       "/admin-dashboard/learners",
  98  |       "/admin-dashboard/assessments",
  99  |       "/admin-dashboard/certificates",
  100 |       "/admin-dashboard/resources",
  101 |       "/admin-dashboard/workshops",
  102 |       "/admin-dashboard/analytics",
  103 |     ];
  104 | 
  105 |     for (const path of paths) {
  106 |       const res = await page.goto(path);
  107 |       expect(res?.status(), path).toBeLessThan(500);
  108 |       await expect(page).toHaveURL(new RegExp(path.replace(/\//g, "\\/")));
  109 |       await expect(page.locator("body")).not.toContainText("MIDDLEWARE_INVOCATION_FAILED");
  110 |     }
  111 |   });
  112 | });
  113 | 
```