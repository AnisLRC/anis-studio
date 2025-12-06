-- ============================================
-- Supabase LRC Inquiries Table Setup
-- ============================================
-- 
-- Ova SQL skripta kreira tablicu 'lrc_inquiries' u Supabase bazi podataka.
-- 
-- Upute:
-- 1. Otvori Supabase Dashboard → SQL Editor
-- 2. Copy/paste cijeli sadržaj ovog fajla u SQL Editor
-- 3. Klikni "Run" ili pritisni Ctrl+Enter
-- 
-- ============================================

-- Kreiraj tablicu 'lrc_inquiries' ako ne postoji
create table if not exists lrc_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  product text not null,
  description text not null,
  name text not null,
  email text not null,
  phone text,
  language text not null default 'hr',
  source text not null default 'web',
  status text not null default 'new'
);

-- ============================================
-- Provjera: provjeri da li je tablica kreirana
-- ============================================
-- Otkomentiraj sljedeću liniju za provjeru:
-- select * from lrc_inquiries;

