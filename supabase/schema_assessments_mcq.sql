-- MCQ questions + richer submissions (cheat flag)
-- Run AFTER schema_lms_v2.sql

create table if not exists public.assessment_questions (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments (id) on delete cascade,
  prompt text not null,
  options jsonb not null,
  correct_index integer not null check (correct_index >= 0),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.assessment_questions enable row level security;

drop policy if exists "Read questions for published assessments" on public.assessment_questions;
create policy "Read questions for published assessments"
  on public.assessment_questions for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.assessments a
      where a.id = assessment_questions.assessment_id
        and a.status = 'published'
    )
  );

drop policy if exists "Admins manage questions" on public.assessment_questions;
create policy "Admins manage questions"
  on public.assessment_questions for all
  using (public.is_admin())
  with check (public.is_admin());

alter table public.assessment_submissions
  add column if not exists answers jsonb,
  add column if not exists cheated boolean not null default false,
  add column if not exists started_at timestamptz default now();

drop policy if exists "Users update own submissions" on public.assessment_submissions;
create policy "Users update own submissions"
  on public.assessment_submissions for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

-- Seed published MCQ exam
insert into public.assessments (course_id, title, assessment_type, status, due_at)
select c.id, 'Module 3 Quiz — Canal Anatomy', 'exam', 'published', now() + interval '14 days'
from public.courses c
where c.slug = 'endodontics-remote'
  and not exists (
    select 1 from public.assessments a
    where a.title = 'Module 3 Quiz — Canal Anatomy' and a.course_id = c.id
  );

delete from public.assessment_questions q
using public.assessments a
where q.assessment_id = a.id
  and a.title = 'Module 3 Quiz — Canal Anatomy';

insert into public.assessment_questions (assessment_id, prompt, options, correct_index, sort_order)
select a.id, v.prompt, v.options::jsonb, v.correct_index, v.sort_order
from public.assessments a
cross join (
  values
    (
      'How many canals are most commonly found in a maxillary first molar?',
      '["1","2","3","4"]',
      3,
      1
    ),
    (
      'Which canal is most often missed in maxillary first molars?',
      '["Palatal","MB1","MB2","Distobuccal"]',
      2,
      2
    ),
    (
      'Working length is ideally measured to:',
      '["Radiographic apex","0.5–1 mm short of the apex","2 mm beyond the apex","Cementoenamel junction"]',
      1,
      3
    ),
    (
      'The apical constriction is typically located:',
      '["At the radiographic apex","Slightly short of the anatomic apex","In the pulp chamber","At the CEJ"]',
      1,
      4
    ),
    (
      'A continuous tapering funnel shape in canal prep helps primarily with:',
      '["Tooth whitening","Irrigation and obturation","Enamel bonding","Periodontal probing"]',
      1,
      5
    )
) as v(prompt, options, correct_index, sort_order)
where a.title = 'Module 3 Quiz — Canal Anatomy';
