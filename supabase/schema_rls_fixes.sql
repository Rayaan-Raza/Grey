-- Allow admins to read all profiles (for learners list)
-- Safe to re-run

drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
  on public.profiles for select
  using (public.is_admin() or auth.uid() = id);

-- Allow admins to count workshop registrations
drop policy if exists "Anyone can count workshop regs" on public.workshop_registrations;
create policy "Anyone can count workshop regs"
  on public.workshop_registrations for select
  using (true);
