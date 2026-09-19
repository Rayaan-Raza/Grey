# Grey Dental — User TODO

Things **you** need to do in Supabase / env. Agents update this as backend work lands.

Last updated: 2026-09-19 (auth signup/login fixes)

---

## Do now (blocking)

### 0. Fix Auth so signup / login works (do this first)

Registration is currently failing with **email rate limit** because Supabase “Confirm email” is ON and every signup tries to send mail.

In [Supabase Dashboard](https://supabase.com/dashboard) → your project:

1. **Authentication → Providers → Email**
   - Turn **OFF** “Confirm email” while developing / presenting
2. **Authentication → URL Configuration**
   - **Site URL:** `https://grey-coral.vercel.app`
   - **Redirect URLs** (add all):
     - `https://grey-coral.vercel.app/**`
     - `https://grey-coral.vercel.app/auth/callback`
     - `http://localhost:3000/**`
     - `http://localhost:3000/auth/callback`
3. (Optional) **Authentication → Providers → Google** — enable only if you want “Continue with Google”
4. If someone already signed up but can’t log in: Authentication → Users → open user → **Confirm** manually

After step 1, new signups get a session immediately and land on `/student-dashboard`.

### 1. Run these SQL files in Supabase (SQL Editor)

Run **in order**. Skip any you already ran successfully.

| # | File | Why |
|---|------|-----|
| 1 | `supabase/schema.sql` | profiles (likely done) |
| 2 | `supabase/schema_lms.sql` | courses/enrollments (likely done) |
| 3 | `supabase/schema_lms_v2.sql` | orders, assessments, certificates, workshop_registrations, phone |
| 4 | `supabase/schema_checkout.sql` | order insert policy + $269 course price |
| 5 | `supabase/schema_rls_fixes.sql` | admin can list learners; workshop reg counts |
| 6 | `supabase/seed_content.sql` | sample workshops + public resources |
| 7 | `supabase/schema_assessments_mcq.sql` | **NEW** — MCQ questions + cheat flag + sample Canal Anatomy quiz |

Each should show: **Success. No rows returned** (normal).

### 2. Make yourself admin

Table Editor → `profiles` → set your row `role` = `admin`.

### 3. Restart + verify

```bash
cd Greydental
npm run test:backend
node scripts/check-keys.mjs
npm run dev
```

---

## Optional later

- [ ] Re-enable “Confirm email” for production when ready
- [ ] Replace Stripe dummy keys in `.env.local` when going live
- [ ] Add real `SUPABASE_SERVICE_ROLE_KEY` for Stripe webhooks + E2E user provisioning
- [ ] Stripe webhook URL → `/api/webhooks/stripe`

### Vercel deploy (required for production)

In Vercel → Project → **Settings → Environment Variables**, add for Production:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://YOUR_REF.supabase.co` (no `/rest/v1`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key from Supabase |

Also set **Root Directory** to `Greydental` if the repo root is the parent folder.

Then **Redeploy**. Missing these vars causes `MIDDLEWARE_INVOCATION_FAILED`.

### Browser E2E agent

```bash
cd Greydental
npx playwright install chromium
npm run test:e2e
```

Public + auth-gate tests run with no secrets.

For **signed-in student/admin dashboards**, pick one:

1. Put real accounts in `.env.local`:

```env
E2E_BASE_URL=https://grey-coral.vercel.app
E2E_STUDENT_EMAIL=your-student@email.com
E2E_STUDENT_PASSWORD=your-password
E2E_ADMIN_EMAIL=your-admin@email.com
E2E_ADMIN_PASSWORD=your-password
```

2. Or set `SUPABASE_SERVICE_ROLE_KEY` and run:

```bash
npm run test:e2e:provision
```

Then paste the printed `E2E_*` lines into `.env.local`. Global setup will also auto-create users when the service role key is present.

While developing, disable **Confirm email** in Supabase → Authentication → Providers → Email (avoids signup rate limits).

Cursor skill: `.cursor/skills/grey-dental-browser-e2e/`

---

## Quick test after SQL

1. Log in  
2. `/checkout?course=endodontics-remote` → Complete Purchase  
3. `/student-dashboard/courses` — enrolled course  
4. `/student-dashboard/workshops` — Register Now  
5. `/student-dashboard/resources` — seeded files  
6. `/student-dashboard/assignments` → Take exam (MCQ). **Leaving the tab = score 0**  
7. As admin: `/admin-dashboard/courses`, `/learners`, `/resources`  

---

## Done for you (no action)

- Auth + middleware  
- Courses / enrollments / checkout (demo Stripe)  
- Profile settings save  
- Workshops + resources + learners APIs + live UI wiring  
- `USER_TODO.md` (this file)

---

## For agents

When you add a feature that needs a manual Supabase/env step, put it under **Do now** and date the file.
