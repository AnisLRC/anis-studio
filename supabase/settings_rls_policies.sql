-- ============================================
-- Supabase: settings RLS policies
-- ============================================
-- Tablica public.settings ima jedan jedini red (id = 1).
-- Sve settings operacije rade na točno tom redu.
--
-- Model pristupa:
--   anon (javna stranica):
--     SELECT  → DA, samo red id=1 (javna vidljivost toggleova)
--     INSERT  → NE
--     UPDATE  → NE
--     DELETE  → NE
--
--   authenticated (admin):
--     SELECT  → DA, svi redovi (u praksi samo id=1)
--     INSERT  → NE (red id=1 kreiran je inicijalnom migracijom i ne treba se kreirati iz UI)
--     UPDATE  → DA, samo red id=1 (AdminSettingsPage toggle-ovi)
--     DELETE  → NE
--
-- Upute:
-- 1. Supabase Dashboard → SQL Editor
-- 2. Zalijepi cijeli sadržaj i pokreni (Run).
-- Idempotentno: sigurno pokrenuti više puta.
-- ============================================

-- ============================================
-- 1. Uključi RLS na tablici settings
-- ============================================

alter table public.settings enable row level security;

-- ============================================
-- 2. Idempotentno ukloni stare politike
-- ============================================

drop policy if exists "settings_anon_select"           on public.settings;
drop policy if exists "settings_authenticated_select"  on public.settings;
drop policy if exists "settings_authenticated_update"  on public.settings;

-- ============================================
-- 3. Politike
-- ============================================

-- Anon (javna stranica): čitanje isključivo reda id=1
-- Ovo omogućuje Header, PortfolioSection, LrcInquiryPage i InterijeriStolariPage
-- da čitaju vidljivost toggleove bez prijave.
create policy "settings_anon_select"
on public.settings
for select
to anon
using (id = 1);

-- Authenticated (admin): čitanje svih redova (u praksi samo id=1)
create policy "settings_authenticated_select"
on public.settings
for select
to authenticated
using (true);

-- Authenticated (admin): ažuriranje isključivo reda id=1
-- AdminSettingsPage.tsx → updateSettings() → UPDATE WHERE id=1
create policy "settings_authenticated_update"
on public.settings
for update
to authenticated
using (id = 1)
with check (id = 1);

-- ============================================
-- Provjera (opcionalno — otkomentiraj u SQL Editoru):
-- select policyname, cmd, roles, qual, with_check
-- from pg_policies
-- where schemaname = 'public' and tablename = 'settings';
--
-- Očekivani rezultat: 3 retka
--   settings_anon_select          SELECT  {anon}           id = 1
--   settings_authenticated_select SELECT  {authenticated}  true
--   settings_authenticated_update UPDATE  {authenticated}  id = 1
-- ============================================
