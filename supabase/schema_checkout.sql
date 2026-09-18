-- Checkout: allow students to create their own pending/paid orders
-- Safe to re-run

drop policy if exists "Users create own orders" on public.orders;
create policy "Users create own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users update own pending orders" on public.orders;
create policy "Users update own pending orders"
  on public.orders for update
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

-- Demo price for the remote endodontics course ($269.00)
update public.courses
set price_cents = 26900,
    updated_at = now()
where slug = 'endodontics-remote' and price_cents = 0;
