-- Phase 3.2+ schema extensions
-- Run AFTER schema_lms.sql

alter table public.courses
  add column if not exists instructor_name text,
  add column if not exists subtitle text;

alter table public.resources
  add column if not exists category text,
  add column if not exists file_size text,
  add column if not exists uploaded_by uuid references public.profiles (id) on delete set null;

alter table public.profiles
  add column if not exists phone text;

create table if not exists public.workshop_registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  workshop_id uuid not null references public.workshops (id) on delete cascade,
  registered_at timestamptz not null default now(),
  unique (user_id, workshop_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  stripe_session_id text unique,
  amount_cents integer not null default 0,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz not null default now()
);

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses (id) on delete set null,
  title text not null,
  assessment_type text not null default 'quiz'
    check (assessment_type in ('quiz', 'assignment', 'exam')),
  due_at timestamptz,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assessment_submissions (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  score integer check (score is null or (score >= 0 and score <= 100)),
  status text not null default 'submitted'
    check (status in ('submitted', 'graded', 'late')),
  submitted_at timestamptz not null default now(),
  unique (assessment_id, user_id)
);

create table if not exists public.certificate_templates (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses (id) on delete set null,
  title text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  template_id uuid references public.certificate_templates (id) on delete set null,
  status text not null default 'issued'
    check (status in ('issued', 'revoked')),
  issued_at timestamptz not null default now(),
  unique (user_id, course_id)
);

alter table public.workshop_registrations enable row level security;
alter table public.orders enable row level security;
alter table public.assessments enable row level security;
alter table public.assessment_submissions enable row level security;
alter table public.certificate_templates enable row level security;
alter table public.certificates enable row level security;

-- Workshop registrations
drop policy if exists "Users read own workshop regs" on public.workshop_registrations;
create policy "Users read own workshop regs"
  on public.workshop_registrations for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Users register for workshops" on public.workshop_registrations;
create policy "Users register for workshops"
  on public.workshop_registrations for insert
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "Admins manage workshop regs" on public.workshop_registrations;
create policy "Admins manage workshop regs"
  on public.workshop_registrations for all
  using (public.is_admin())
  with check (public.is_admin());

-- Orders
drop policy if exists "Users read own orders" on public.orders;
create policy "Users read own orders"
  on public.orders for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Admins manage orders" on public.orders;
create policy "Admins manage orders"
  on public.orders for all
  using (public.is_admin())
  with check (public.is_admin());

-- Assessments
drop policy if exists "Read published assessments" on public.assessments;
create policy "Read published assessments"
  on public.assessments for select
  using (status = 'published' or public.is_admin());

drop policy if exists "Admins manage assessments" on public.assessments;
create policy "Admins manage assessments"
  on public.assessments for all
  using (public.is_admin())
  with check (public.is_admin());

-- Submissions
drop policy if exists "Users read own submissions" on public.assessment_submissions;
create policy "Users read own submissions"
  on public.assessment_submissions for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Users submit assessments" on public.assessment_submissions;
create policy "Users submit assessments"
  on public.assessment_submissions for insert
  with check (auth.uid() = user_id);

drop policy if exists "Admins update submissions" on public.assessment_submissions;
create policy "Admins update submissions"
  on public.assessment_submissions for update
  using (public.is_admin())
  with check (public.is_admin());

-- Certificate templates
drop policy if exists "Anyone read cert templates" on public.certificate_templates;
create policy "Anyone read cert templates"
  on public.certificate_templates for select
  using (true);

drop policy if exists "Admins manage cert templates" on public.certificate_templates;
create policy "Admins manage cert templates"
  on public.certificate_templates for all
  using (public.is_admin())
  with check (public.is_admin());

-- Certificates
drop policy if exists "Users read own certificates" on public.certificates;
create policy "Users read own certificates"
  on public.certificates for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Admins manage certificates" on public.certificates;
create policy "Admins manage certificates"
  on public.certificates for all
  using (public.is_admin())
  with check (public.is_admin());

-- Refresh course seed with instructor/subtitle when columns exist
update public.courses set
  instructor_name = coalesce(instructor_name, 'Grey Dental Faculty'),
  subtitle = coalesce(subtitle, description)
where instructor_name is null or subtitle is null;
