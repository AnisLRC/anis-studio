-- ============================================
-- I6D-C: RLS za clients i carpenters
--        + SECURITY DEFINER RPC dedup funkcije
-- ============================================
--
-- Ovaj file je idempotent — može se pokrenuti više puta.
--
-- Upute:
-- 1. Otvori Supabase Dashboard → SQL Editor
-- 2. Copy/paste cijeli sadržaj ovog fajla
-- 3. Klikni "Run"
--
-- ============================================

-- ============================================
-- 1. Uključi RLS
-- ============================================

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carpenters ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. RLS politike za clients
-- ============================================

-- Ukloni stare politike ako postoje (idempotentnost)
DROP POLICY IF EXISTS clients_authenticated_select ON public.clients;
DROP POLICY IF EXISTS clients_authenticated_insert ON public.clients;
DROP POLICY IF EXISTS clients_authenticated_update ON public.clients;

-- Authenticated korisnici (admin) mogu čitati sve klijente
CREATE POLICY clients_authenticated_select
  ON public.clients
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated korisnici mogu insertati (npr. admin testiranje)
CREATE POLICY clients_authenticated_insert
  ON public.clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated korisnici mogu ažurirati (admin uređivanje profila)
CREATE POLICY clients_authenticated_update
  ON public.clients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- anon: nema SELECT, INSERT, UPDATE, DELETE direktno na tablici
-- Jedini javni pristup je kroz find_or_create_client RPC (SECURITY DEFINER)

-- ============================================
-- 3. RLS politike za carpenters
-- ============================================

DROP POLICY IF EXISTS carpenters_authenticated_select ON public.carpenters;
DROP POLICY IF EXISTS carpenters_authenticated_insert ON public.carpenters;
DROP POLICY IF EXISTS carpenters_authenticated_update ON public.carpenters;

CREATE POLICY carpenters_authenticated_select
  ON public.carpenters
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY carpenters_authenticated_insert
  ON public.carpenters
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY carpenters_authenticated_update
  ON public.carpenters
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 4. RPC funkcija: find_or_create_client
-- ============================================
--
-- Poziva je anon ključ s javne forme /interijeri/klijenti.
-- SECURITY DEFINER: radi kao DB owner, bypass RLS za INSERT/SELECT
-- Vraća samo UUID — ne puni PII row.
--
-- Dedup logika:
--   INSERT ON CONFLICT (email) DO NOTHING
--   SELECT id WHERE email = trimani email
--
-- Ako name ili email ostanu prazni nakon trim-a → raise exception.
-- ============================================

CREATE OR REPLACE FUNCTION public.find_or_create_client(
  p_name     text,
  p_email    text,
  p_phone    text,
  p_language text,
  p_notes    text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_name     text := TRIM(p_name);
  v_email    text := TRIM(p_email);
  v_phone    text := NULLIF(TRIM(COALESCE(p_phone, '')), '');
  v_language text := COALESCE(NULLIF(TRIM(p_language), ''), 'hr');
  v_notes    text := NULLIF(TRIM(COALESCE(p_notes, '')), '');
  v_id       uuid;
BEGIN
  -- Validacija obaveznih polja
  IF v_name = '' OR v_name IS NULL THEN
    RAISE EXCEPTION 'find_or_create_client: p_name ne smije biti prazan';
  END IF;

  IF v_email = '' OR v_email IS NULL THEN
    RAISE EXCEPTION 'find_or_create_client: p_email ne smije biti prazan';
  END IF;

  -- Pokušaj insert; ako email već postoji, preskoči (DO NOTHING)
  INSERT INTO public.clients (name, email, phone, language, notes)
  VALUES (v_name, v_email, v_phone, v_language, v_notes)
  ON CONFLICT (email) DO NOTHING;

  -- Dohvati id (bio upravo insertiran ili je već postojao)
  SELECT id INTO v_id
  FROM public.clients
  WHERE email = v_email;

  RETURN v_id;
END;
$$;

-- ============================================
-- 5. RPC funkcija: find_or_create_carpenter
-- ============================================
--
-- Poziva je anon ključ s javne forme /interijeri/stolari.
-- SECURITY DEFINER: radi kao DB owner, bypass RLS.
-- Vraća samo UUID.
--
-- Dedup logika:
--   INSERT ON CONFLICT (email) DO NOTHING
--   SELECT id WHERE email = trimani email
--
-- Ako company_name, contact_name ili email ostanu prazni → raise exception.
-- ============================================

CREATE OR REPLACE FUNCTION public.find_or_create_carpenter(
  p_company_name                  text,
  p_contact_name                  text,
  p_email                         text,
  p_phone                         text,
  p_uses_corpus                   boolean,
  p_estimated_vr_projects_per_year integer,
  p_notes                         text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_company_name text    := TRIM(p_company_name);
  v_contact_name text    := TRIM(p_contact_name);
  v_email        text    := TRIM(p_email);
  v_phone        text    := NULLIF(TRIM(COALESCE(p_phone, '')), '');
  v_uses_corpus  boolean := COALESCE(p_uses_corpus, false);
  v_vr_per_year  integer := p_estimated_vr_projects_per_year;
  v_notes        text    := NULLIF(TRIM(COALESCE(p_notes, '')), '');
  v_id           uuid;
BEGIN
  -- Validacija obaveznih polja
  IF v_company_name = '' OR v_company_name IS NULL THEN
    RAISE EXCEPTION 'find_or_create_carpenter: p_company_name ne smije biti prazan';
  END IF;

  IF v_contact_name = '' OR v_contact_name IS NULL THEN
    RAISE EXCEPTION 'find_or_create_carpenter: p_contact_name ne smije biti prazan';
  END IF;

  IF v_email = '' OR v_email IS NULL THEN
    RAISE EXCEPTION 'find_or_create_carpenter: p_email ne smije biti prazan';
  END IF;

  -- Pokušaj insert; ako email već postoji, preskoči (DO NOTHING)
  INSERT INTO public.carpenters (
    company_name,
    contact_name,
    email,
    phone,
    uses_corpus,
    estimated_vr_projects_per_year,
    notes
  )
  VALUES (
    v_company_name,
    v_contact_name,
    v_email,
    v_phone,
    v_uses_corpus,
    v_vr_per_year,
    v_notes
  )
  ON CONFLICT (email) DO NOTHING;

  -- Dohvati id (bio upravo insertiran ili je već postojao)
  SELECT id INTO v_id
  FROM public.carpenters
  WHERE email = v_email;

  RETURN v_id;
END;
$$;

-- ============================================
-- 6. Permissions za RPC funkcije
-- ============================================

-- Ukloni PUBLIC default grant
REVOKE ALL ON FUNCTION public.find_or_create_client(text, text, text, text, text)
  FROM PUBLIC;

REVOKE ALL ON FUNCTION public.find_or_create_carpenter(text, text, text, text, boolean, integer, text)
  FROM PUBLIC;

-- Daj EXECUTE samo anon i authenticated
GRANT EXECUTE ON FUNCTION public.find_or_create_client(text, text, text, text, text)
  TO anon, authenticated;

GRANT EXECUTE ON FUNCTION public.find_or_create_carpenter(text, text, text, text, boolean, integer, text)
  TO anon, authenticated;

-- ============================================
-- Provjera (otkomentiraj za test):
-- ============================================
-- SELECT policyname, roles, cmd FROM pg_policies WHERE tablename IN ('clients', 'carpenters');
-- SELECT proname, prosecdef FROM pg_proc WHERE proname IN ('find_or_create_client', 'find_or_create_carpenter');
