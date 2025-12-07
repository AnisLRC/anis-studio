-- ============================================
-- Supabase Storage RLS Policies za project-files bucket
-- ============================================
-- 
-- Ova SQL skripta kreira Row Level Security (RLS) politike za
-- Supabase Storage bucket "project-files", koje dopuštaju anon korisniku
-- (frontend aplikacija) da uploada i čita datoteke.
-- 
-- Upute:
-- 1. Otvori Supabase Dashboard → SQL Editor
-- 2. Copy/paste cijeli sadržaj ovog fajla u SQL Editor
-- 3. Klikni "Run" ili pritisni Ctrl+Enter
-- 
-- Napomena: Prije izvršavanja ove skripte, provjeri da postoji bucket
-- "project-files" u Storage-u (Storage → New bucket → project-files).
-- 
-- ============================================

-- ============================================
-- Policy: Dopusti anon upload u bucket "project-files"
-- ============================================
-- Ova policy dopušta anon korisniku (frontend aplikacija) da uploada
-- datoteke u bucket "project-files".
-- 
-- Kritično za funkcionalnost uploada iz klijentske forme.

create policy if not exists "Allow anon uploads to project-files"
on storage.objects
for insert
to anon
with check (bucket_id = 'project-files');

-- ============================================
-- Policy: Dopusti anon čitanje objekata iz bucket-a "project-files"
-- ============================================
-- Ova policy dopušta anon korisniku da čita (download) datoteke iz
-- bucket-a "project-files".
-- 
-- Korisno ako ćeš raditi direktne storage.from(...).getPublicUrl(...)
-- pozive iz frontenda ili ako želiš omogućiti direktan pristup datotekama.

create policy if not exists "Allow anon read from project-files"
on storage.objects
for select
to anon
using (bucket_id = 'project-files');

-- ============================================
-- Provjera: provjeri da li su politike kreirane
-- ============================================
-- Otkomentiraj sljedeće linije za provjeru:
-- 
-- select * from pg_policies 
-- where schemaname = 'storage' 
-- and tablename = 'objects' 
-- and policyname like '%project-files%';


