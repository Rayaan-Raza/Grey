-- Sample workshops + public resources
-- Run AFTER schema_lms.sql and schema_lms_v2.sql

insert into public.workshops (
  slug, title, description, image_url, location, starts_at, ends_at, capacity, status
)
values
  (
    'endo-access-live',
    'Endo Access & Canal Shaping — Live Demo',
    'Live clinical demo covering access cavity design and rotary shaping fundamentals.',
    '/Student-Workshop/f6a4a7f5cf7d4c7df0030029ed6e95e90deddb96.png',
    'Online',
    '2026-09-03 14:00:00+00',
    '2026-09-03 16:00:00+00',
    50,
    'published'
  ),
  (
    'obturation-hands-on',
    'Hands-On Obturation Techniques',
    'Warm vertical and carrier-based obturation practice session.',
    '/Student-Workshop/bdd0321b287978f43523bf5a82582c77b5261ac4.png',
    'Online',
    '2026-09-17 13:00:00+00',
    '2026-09-17 16:00:00+00',
    40,
    'published'
  ),
  (
    'implant-site-prep',
    'Implant Site Preparation & Placement',
    'Surgical site prep, osteotomy sequence, and placement fundamentals.',
    '/Student-Workshop/c040503634ac81f55fa0eec351fcfac433e9f782.png',
    'Online',
    '2026-09-10 12:00:00+00',
    '2026-09-10 16:00:00+00',
    45,
    'published'
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at,
  capacity = excluded.capacity,
  status = excluded.status,
  updated_at = now();

insert into public.resources (
  title, description, file_url, resource_type, category, is_public, file_size
)
select
  'Endodontic Tray Setup Guide',
  'Complete instrument checklist and tray organization for rotary and hand instrumentation.',
  '/Student-Resources/Uploaded Image.png',
  'document',
  'Clinical Handbooks',
  true,
  '2.4 MB'
where not exists (
  select 1 from public.resources where title = 'Endodontic Tray Setup Guide'
);

insert into public.resources (
  title, description, file_url, resource_type, category, is_public, file_size
)
select
  'Implant Site Checklist',
  'Bone density evaluation, soft tissue depth, and anatomical boundary mapping template.',
  '/Student-Resources/Uploaded Image.png',
  'document',
  'Clinical Handbooks',
  true,
  '1.1 MB'
where not exists (
  select 1 from public.resources where title = 'Implant Site Checklist'
);

insert into public.resources (
  title, description, file_url, resource_type, category, is_public, file_size
)
select
  'Foundations of Endodontics',
  'Core textbook excerpt covering diagnosis, access, and canal preparation fundamentals.',
  '/Student-Resources/cb432d0245436669e60e63d4c22ad9490e7cb6a2.png',
  'document',
  'Comprehensive Textbooks',
  true,
  '8.6 MB'
where not exists (
  select 1 from public.resources where title = 'Foundations of Endodontics'
);

insert into public.resources (
  title, description, file_url, resource_type, category, is_public, file_size
)
select
  'Post-Operative Care Guide',
  'Patient instructions and follow-up checklist after endodontic treatment.',
  '/Student-Resources/FileIcon.png',
  'document',
  'Clinical Handbooks',
  true,
  '0.8 MB'
where not exists (
  select 1 from public.resources where title = 'Post-Operative Care Guide'
);
