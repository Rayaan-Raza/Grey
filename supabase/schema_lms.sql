-- Phase 3.2 LMS schema
-- Run in Supabase SQL Editor AFTER schema.sql (profiles)

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  image_url text,
  module_count integer not null default 0,
  price_cents integer not null default 0,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  progress integer not null default 0
    check (progress >= 0 and progress <= 100),
  status text not null default 'active'
    check (status in ('active', 'completed', 'cancelled')),
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table if not exists public.workshops (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  image_url text,
  location text,
  starts_at timestamptz,
  ends_at timestamptz,
  capacity integer,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text,
  resource_type text not null default 'document'
    check (resource_type in ('document', 'video', 'link', 'other')),
  course_id uuid references public.courses (id) on delete set null,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.workshops enable row level security;
alter table public.resources enable row level security;

-- Courses
drop policy if exists "Anyone can read published courses" on public.courses;
create policy "Anyone can read published courses"
  on public.courses for select
  using (status = 'published' or public.is_admin());

drop policy if exists "Admins manage courses" on public.courses;
create policy "Admins manage courses"
  on public.courses for all
  using (public.is_admin())
  with check (public.is_admin());

-- Enrollments
drop policy if exists "Users read own enrollments" on public.enrollments;
create policy "Users read own enrollments"
  on public.enrollments for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Users create own enrollments" on public.enrollments;
create policy "Users create own enrollments"
  on public.enrollments for insert
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "Users update own enrollments" on public.enrollments;
create policy "Users update own enrollments"
  on public.enrollments for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "Admins delete enrollments" on public.enrollments;
create policy "Admins delete enrollments"
  on public.enrollments for delete
  using (public.is_admin());

-- Workshops
drop policy if exists "Anyone can read published workshops" on public.workshops;
create policy "Anyone can read published workshops"
  on public.workshops for select
  using (status = 'published' or public.is_admin());

drop policy if exists "Admins manage workshops" on public.workshops;
create policy "Admins manage workshops"
  on public.workshops for all
  using (public.is_admin())
  with check (public.is_admin());

-- Resources
drop policy if exists "Read public or enrolled resources" on public.resources;
create policy "Read public or enrolled resources"
  on public.resources for select
  using (
    is_public = true
    or public.is_admin()
    or (
      course_id is not null
      and exists (
        select 1 from public.enrollments e
        where e.course_id = resources.course_id
          and e.user_id = auth.uid()
          and e.status in ('active', 'completed')
      )
    )
  );

drop policy if exists "Admins manage resources" on public.resources;
create policy "Admins manage resources"
  on public.resources for all
  using (public.is_admin())
  with check (public.is_admin());

-- Seed published courses (safe to re-run)
insert into public.courses (slug, title, description, image_url, module_count, price_cents, status)
values
  (
    'endodontics-remote',
    'Foundations of Endodontics - Remote',
    'Remote learning track covering canal anatomy and clinical fundamentals.',
    '/main-page-featured/feature-1.jpg',
    10,
    0,
    'published'
  ),
  (
    'endodontics-residency',
    'Foundations of Endodontics - Immersive',
    'Immersive residency-style endodontics training.',
    '/main-page-featured/feature-2.jpg',
    12,
    0,
    'published'
  ),
  (
    'implants-bootcamp',
    'Dental Implants Bootcamp',
    'Practical implant foundations for general practitioners.',
    '/main-page-featured/feature-3.jpg',
    8,
    0,
    'published'
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  module_count = excluded.module_count,
  status = excluded.status,
  updated_at = now();
