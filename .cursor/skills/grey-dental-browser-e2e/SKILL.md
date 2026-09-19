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

### Auth credentials (for dashboard tests)

Priority order:

1. `E2E_STUDENT_*` / `E2E_ADMIN_*` already in `.env.local`
2. Auto-provision via `SUPABASE_SERVICE_ROLE_KEY` in Playwright `global-setup` / `npm run test:e2e:provision`
3. Browser signup at `/signup` (needs Confirm email OFF; rate-limited otherwise)

```env
E2E_STUDENT_EMAIL=...
E2E_STUDENT_PASSWORD=...
E2E_ADMIN_EMAIL=...
E2E_ADMIN_PASSWORD=...
SUPABASE_SERVICE_ROLE_KEY=...   # optional; enables auto-provision
```

Without student credentials and with signup blocked, student dashboard tests **skip** (public suite still runs).
Admin tests skip without `E2E_ADMIN_*` (or service-role auto-provision).

## What to verify

### Public
1. `/` — home loads, Login + Sign up links visible
2. `/courses`, `/about`, `/contact` — 200 / no middleware 500
3. `/login` — email + password fields + Log In button
4. `/signup` — Create Account form
5. Logged-out `/student-dashboard` and `/admin-dashboard` → `/login`
6. Bad password stays on `/login` with an error

### Student
1. Login/signup → `/student-dashboard`
2. Visit: courses, progress, assignments, workshops, resources, certificates, community, profile, settings, help
3. Student hitting `/admin-dashboard` must be redirected away

### Admin (requires admin role)
1. Login → can open `/admin-dashboard`
2. Visit: courses, learners, assessments, certificates, resources, workshops, analytics

## Failure signals

- `MIDDLEWARE_INVOCATION_FAILED` → missing Vercel `NEXT_PUBLIC_SUPABASE_*` env
- `email rate limit exceeded` → Confirm email ON + too many signups; use service role provision or existing accounts
- Login stays on `/login` with error → wrong password or email confirm required
- Dashboard redirects to `/login` → session/cookies or middleware issue

## Agent behavior

1. Run `npm run test:e2e` and report pass/fail/skip table.
2. Do not print passwords in chat.
3. After failures, check Vercel env + Supabase Auth users before changing UI code.
