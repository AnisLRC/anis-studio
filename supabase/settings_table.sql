-- ============================================
-- Supabase Settings Table Setup
-- ============================================
-- 
-- Ova SQL skripta kreira tablicu 'settings' u Supabase bazi podataka.
-- 
-- Upute:
-- 1. Otvori Supabase Dashboard → SQL Editor
-- 2. Copy/paste cijeli sadržaj ovog fajla u SQL Editor
-- 3. Klikni "Run" ili pritisni Ctrl+Enter
-- 
-- ============================================

-- Kreiraj tablicu 'settings' ako ne postoji
create table if not exists settings (
  id integer primary key default 1,
  is_lrc_form_enabled boolean not null default true
);

-- Osiguraj da postoji barem jedan red (id = 1)
-- Ako red već postoji, ne mijenjaj ga (on conflict do nothing)
insert into settings (id, is_lrc_form_enabled)
values (1, true)
on conflict (id) do nothing;

-- ============================================
-- Provjera: provjeri da li je tablica kreirana
-- ============================================
-- Otkomentiraj sljedeću liniju za provjeru:
-- select * from settings;


