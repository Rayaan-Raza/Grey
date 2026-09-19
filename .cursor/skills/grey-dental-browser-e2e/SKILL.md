---
name: grey-dental-browser-e2e
description: >-
  Browser-tests the live Grey Dental site (https://grey-coral.vercel.app) —
  marketing pages, login/signup, student dashboard, and admin dashboard.
  Use when the user asks to test the website, run E2E, smoke-test Vercel,
  verify login/dashboards, or check production.
---

# Grey Dental Browser E2E Agent

## Default target

`https://grey-coral.vercel.app`

Override with env `E2E_BASE_URL` if needed.

## How to run

From `Greydental/`:

```bash
npm run test:e2e
```

Auth flows need credentials in `.env.local` (or the shell):

```env
E2E_STUDENT_EMAIL=...
E2E_STUDENT_PASSWORD=...
E2E_ADMIN_EMAIL=...
E2E_ADMIN_PASSWORD=...
```

Without credentials, public + login-page smoke tests still run; signed-in dashboard tests are skipped.

## What to verify

### Public
1. `/` — home loads, Login + Sign up links visible
2. `/courses`, `/about`, `/contact` — 200 / no middleware 500
3. `/login` — email + password fields + Log In button
4. `/signup` — Create Account form

### Student (requires E2E_STUDENT_*)
1. Login → lands on `/student-dashboard` (or role home)
2. Visit: courses, progress, assignments, workshops, resources, certificates, community, profile, settings, help
3. Assignments → “Take exam” link works if assessment seeded
4. Logout / login link in shell works

### Admin (requires E2E_ADMIN_* with profiles.role = admin)
1. Login → can open `/admin-dashboard`
2. Visit: courses, learners, assessments, certificates, resources, workshops, analytics
3. Non-admin must be redirected away from admin

## Failure signals

- `MIDDLEWARE_INVOCATION_FAILED` → missing Vercel `NEXT_PUBLIC_SUPABASE_*` env
- Login stays on `/login` with error → wrong password or email confirm required
- Dashboard redirects to `/login` → session/cookies or middleware issue
- Empty courses/workshops → SQL seeds not run (`USER_TODO.md`)

## Agent behavior

1. Run `npm run test:e2e` and report pass/fail table.
2. If auth env missing, say which tests were skipped and ask for student/admin emails.
3. Do not print passwords in chat.
4. After failures, check Vercel env + Supabase Auth users before changing UI code.
