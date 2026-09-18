---
name: grey-dental-backend-test
description: >-
  Verifies and advances the Grey Dental Supabase backend (env, auth, schema,
  courses/enrollments). Use when the user asks to test the backend, verify
  Supabase, run Phase 3 checks, or continue backend implementation against the
  phase tracker.
---

# Grey Dental Backend Test Agent

## When invoked

1. Run the verifier from `Greydental`:
   ```bash
   npm run test:backend
   ```
2. Fix any failing checks before adding features.
3. Follow the phase tracker (`Grey_Dental_Phase_Tracker_Revised.xlsx`):
   - **3.1** Supabase + Auth
   - **3.2** Database schema
   - **3.3** Courses & enrollments
   - **3.4** Wire dashboards to live data
4. After schema SQL changes, tell the user to run the new file in Supabase SQL Editor (unless they have the service role wired).
5. Keep work scoped to the current phase task; do not jump to payments (Phase 4) early.

## Project facts

- App root: `Greydental/`
- Env: `Greydental/.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- URL must be `https://<ref>.supabase.co` (no `/rest/v1/`)
- Schema files: `Greydental/supabase/*.sql`
- Clients: `src/lib/supabase/{client,server,middleware}.ts`

## Pass criteria for Phase 3.1

- Env vars present and URL shape correct
- `profiles` table readable via anon/authenticated client
- Signup/login pages call Supabase Auth
- Middleware guards `/student-dashboard` and `/admin-dashboard`

## Pass criteria for Phase 3.2

- Tables exist: `profiles`, `courses`, `enrollments`, `workshops`, `resources`
- RLS enabled on all of them
- Verifier reports tables OK

## Pass criteria for Phase 3.3

- `GET /api/courses` returns published courses from DB
- Enrollments queryable for the signed-in user
