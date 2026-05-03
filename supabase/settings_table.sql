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

-- Javna vidljivost poslovnih sekcija (Interijeri, LRC, Web Atelier)
alter table settings add column if not exists interiors_public_visible boolean not null default true;
alter table settings add column if not exists lrc_public_visible boolean not null default false;
alter table settings add column if not exists web_atelier_public_visible boolean not null default false;

update settings
set
  interiors_public_visible = true,
  lrc_public_visible = false,
  web_atelier_public_visible = false
where id = 1;

-- ============================================
-- Provjera: provjeri da li je tablica kreirana
-- ============================================
-- Otkomentiraj sljedeću liniju za provjeru:
-- select * from settings;






