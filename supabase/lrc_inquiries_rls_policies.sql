-- ============================================
-- Supabase RLS Policies za lrc_inquiries tablicu
-- ============================================
-- 
-- Ova SQL skripta dodaje Row Level Security (RLS) politike za
-- tablicu 'lrc_inquiries' kako bi omogućila anonymous (anon) korisnicima
-- da šalju upite preko public formi (Contact i LRC forma).
-- 
-- Upute:
-- 1. Otvori Supabase Dashboard → SQL Editor
-- 2. Copy/paste cijeli sadržaj ovog fajla u SQL Editor
-- 3. Klikni "Run" ili pritisni Ctrl+Enter
-- 
-- VAŽNO: Ovo je KRITIČNO za rad formi na produkciji!
-- ============================================

-- ============================================
-- Omogući RLS na tablici lrc_inquiries
-- ============================================
ALTER TABLE lrc_inquiries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Policy 1: Dopusti anonymous (anon) korisnicima INSERT
-- ============================================
-- Ova policy omogućava svim posjetiteljima stranice (bez prijave)
-- da šalju upite preko Contact i LRC formi.
-- 
-- TO anon = odnosi se na unauthenticated korisnike (javna stranica)
-- WITH CHECK (true) = nema restrikcija, svi mogu insertat

CREATE POLICY "Anyone can submit inquiries"
ON lrc_inquiries FOR INSERT
TO anon
WITH CHECK (true);

-- ============================================
-- Policy 2: Dopusti authenticated korisnicima READ
-- ============================================
-- Ova policy omogućava admin korisnicima (nakon prijave)
-- da vide sve upite u admin panelu.
-- 
-- TO authenticated = odnosi se na prijavljene korisnike (admin)
-- USING (true) = mogu vidjeti sve redove

CREATE POLICY "Authenticated users can read inquiries"
ON lrc_inquiries FOR SELECT
TO authenticated
USING (true);

-- ============================================
-- Policy 3: Dopusti authenticated korisnicima UPDATE
-- ============================================
-- Ova policy omogućava admin korisnicima da mijenjaju status upita
-- (new → read → archived).

CREATE POLICY "Authenticated users can update inquiries"
ON lrc_inquiries FOR UPDATE
TO authenticated
USING (true);

-- ============================================
-- Policy 4: Dopusti authenticated korisnicima DELETE
-- ============================================
-- Ova policy omogućava admin korisnicima da brišu upite ako je potrebno.

CREATE POLICY "Authenticated users can delete inquiries"
ON lrc_inquiries FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- Provjera: Verifikuj da su politike kreirane
-- ============================================
-- Otkomentiraj sljedeće linije za provjeru:
-- 
-- SELECT policyname, cmd, roles, qual
-- FROM pg_policies 
-- WHERE schemaname = 'public' 
-- AND tablename = 'lrc_inquiries';
-- 
-- Očekivani rezultat: 4 reda (INSERT, SELECT, UPDATE, DELETE policies)

