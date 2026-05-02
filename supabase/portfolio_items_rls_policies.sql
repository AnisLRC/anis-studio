-- ============================================
-- Supabase: portfolio_items RLS policies
-- ============================================
-- Pretpostavlja da tablica public.portfolio_items već postoji
-- (pokreni prvo portfolio_items_table.sql).
--
-- Model:
-- • anon: SELECT samo redova gdje je is_visible = true (javni portfolio kasnije)
-- • authenticated: SELECT / INSERT / UPDATE / DELETE svi redovi
--
-- Upute: SQL Editor → Run
-- ============================================

alter table public.portfolio_items enable row level security;

-- Idempotent re-run
drop policy if exists "portfolio_items_anon_select_visible" on public.portfolio_items;
drop policy if exists "portfolio_items_authenticated_select_all" on public.portfolio_items;
drop policy if exists "portfolio_items_authenticated_insert" on public.portfolio_items;
drop policy if exists "portfolio_items_authenticated_update" on public.portfolio_items;
drop policy if exists "portfolio_items_authenticated_delete" on public.portfolio_items;

-- Anonymous / javni ključ: samo vidljive stavke
create policy "portfolio_items_anon_select_visible"
on public.portfolio_items
for select
to anon
using (is_visible = true);

-- Prijavljeni korisnici: puni pristup čitanju
create policy "portfolio_items_authenticated_select_all"
on public.portfolio_items
for select
to authenticated
using (true);

create policy "portfolio_items_authenticated_insert"
on public.portfolio_items
for insert
to authenticated
with check (true);

create policy "portfolio_items_authenticated_update"
on public.portfolio_items
for update
to authenticated
using (true)
with check (true);

create policy "portfolio_items_authenticated_delete"
on public.portfolio_items
for delete
to authenticated
using (true);

-- ============================================
-- Provjera (opcionalno):
-- select policyname, cmd, roles from pg_policies
-- where schemaname = 'public' and tablename = 'portfolio_items';
-- ============================================
