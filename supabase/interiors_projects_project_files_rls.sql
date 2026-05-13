-- ============================================
-- I6D-D: RLS za projects i project_files
--        + SECURITY DEFINER RPC get_public_vr_project
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

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. RLS politike za projects
-- ============================================

-- Ukloni stare politike ako postoje (idempotentnost)
DROP POLICY IF EXISTS projects_anon_insert          ON public.projects;
DROP POLICY IF EXISTS projects_anon_select          ON public.projects;
DROP POLICY IF EXISTS projects_authenticated_select ON public.projects;
DROP POLICY IF EXISTS projects_authenticated_insert ON public.projects;
DROP POLICY IF EXISTS projects_authenticated_update ON public.projects;
DROP POLICY IF EXISTS projects_authenticated_delete ON public.projects;

-- anon INSERT: javne Interijeri forme mogu kreirati projekt.
-- WITH CHECK:
--   status = 'inquiry'        → forme uvijek startaju s inquiry; anon ne može postavljati
--                               drugi status (npr. 'archived')
--   title IS NOT NULL         → ne smije biti NULL (ponavlja NOT NULL constraint)
--   length(trim(title)) > 0   → ne smije biti prazan string
--   char_length(...notes) < 10000 → spam mitigacija: ogranič veličinu notes payloada
--
-- anon SELECT: ne dodajemo. Javne forme ne trebaju čitati projekte.
-- PublicProjectVrPage koristi SECURITY DEFINER RPC (vidjeti sekciju 4).
--
-- anon UPDATE: ne dodajemo.
-- anon DELETE: ne dodajemo.
CREATE POLICY projects_anon_insert
  ON public.projects
  FOR INSERT
  TO anon
  WITH CHECK (
    status = 'inquiry'
    AND title IS NOT NULL
    AND length(trim(title)) > 0
    AND char_length(coalesce(notes, '')) < 10000
  );

-- Authenticated SELECT: admin čita sve projekte
CREATE POLICY projects_authenticated_select
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated INSERT: admin može ručno kreirati projekt (testiranje/seeding)
CREATE POLICY projects_authenticated_insert
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated UPDATE: admin mijenja status, arhivira, vraća iz arhive
CREATE POLICY projects_authenticated_update
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated DELETE: admin trajno briše projekt.
-- DB kaskada (ON DELETE CASCADE) automatski briše project_files, vr_scenes,
-- vr_appointments — bez potrebe za zasebnom DELETE politikom na child tablicama.
CREATE POLICY projects_authenticated_delete
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- 3. RLS politike za project_files
-- ============================================

DROP POLICY IF EXISTS project_files_anon_insert          ON public.project_files;
DROP POLICY IF EXISTS project_files_anon_select          ON public.project_files;
DROP POLICY IF EXISTS project_files_authenticated_select ON public.project_files;
DROP POLICY IF EXISTS project_files_authenticated_insert ON public.project_files;
DROP POLICY IF EXISTS project_files_authenticated_update ON public.project_files;
DROP POLICY IF EXISTS project_files_authenticated_delete ON public.project_files;

-- anon INSERT: javne forme insertataju metadata red odmah nakon storage uploada.
-- WITH CHECK:
--   storage_bucket = 'project-files' → smije se pisati samo u ispravni bucket
--   original_name IS NOT NULL        → ne smije biti NULL
--   length(trim(original_name)) > 0  → ne smije biti prazan string
--   length(original_name) < 500      → ograniči veličinu filenames
--   project_id IS NOT NULL           → svaki file mora biti vezan uz projekt
--
-- anon SELECT: ne dodajemo. Metadata datoteka nisu javne.
-- anon UPDATE: ne dodajemo.
-- anon DELETE: ne dodajemo.
CREATE POLICY project_files_anon_insert
  ON public.project_files
  FOR INSERT
  TO anon
  WITH CHECK (
    storage_bucket = 'project-files'
    AND original_name IS NOT NULL
    AND length(trim(original_name)) > 0
    AND length(original_name) < 500
    AND project_id IS NOT NULL
  );

-- Authenticated SELECT: admin vidi sve datoteke projekta.
-- Potrebno i za fetchProjectFilesForProject() unutar deleteProject() —
-- storage paths se dohvaćaju prije kaskadnog DB brisanja.
CREATE POLICY project_files_authenticated_select
  ON public.project_files
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated INSERT: admin može ručno dodati file metadata red
CREATE POLICY project_files_authenticated_insert
  ON public.project_files
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated UPDATE: nije korišten u trenutnom kodu, ali dodajemo za budućnost
-- (npr. admin ispravlja original_name ili notes na datoteci).
-- Komentirati ako se želi striktno zabraniti dok nema koda koji ga koristi.
-- CREATE POLICY project_files_authenticated_update
--   ON public.project_files
--   FOR UPDATE
--   TO authenticated
--   USING (true)
--   WITH CHECK (true);

-- Authenticated DELETE: dobra praksa, belt-and-suspenders uz DB kaskadu.
-- DB CASCADE iz projects briše project_files redove bez RLS provjere,
-- ali eksplicitna politika pokriva direktan DELETE na project_files ako treba.
CREATE POLICY project_files_authenticated_delete
  ON public.project_files
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- 4. SECURITY DEFINER RPC: get_public_vr_project
-- ============================================
--
-- Svrha:
--   PublicProjectVrPage treba znati postoji li projekt i je li VR.
--   Direktni anon SELECT na projects tablicu izlaže PII (notes, budget, title
--   s imenom klijenta). Ovaj RPC vraća samo minimalne sigurne podatke.
--
-- Vraća:
--   id, title, wants_vr — bez notes, budget, client_id, carpenter_id, status.
--
-- Uvjet:
--   wants_vr = true — ako projekt nije VR, RPC ne vraca ništa.
--   PublicProjectVrPage prikazuje "Projekt nije pronađen" u tom slučaju,
--   što je ispravno ponašanje (VR stranica nema smisla za non-VR projekte).
--
-- SECURITY DEFINER: radi kao DB owner, zaobilazi RLS — anon može pozvati RPC
-- bez anon SELECT politike na projects tablici.
-- ============================================

CREATE OR REPLACE FUNCTION public.get_public_vr_project(
  p_project_id uuid
)
RETURNS TABLE (
  id          uuid,
  title       text,
  wants_vr    boolean
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id,
    p.title,
    p.wants_vr
  FROM public.projects p
  WHERE p.id = p_project_id
    AND p.wants_vr = true;
$$;

-- Permissions za get_public_vr_project
REVOKE ALL ON FUNCTION public.get_public_vr_project(uuid)
  FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.get_public_vr_project(uuid)
  TO anon, authenticated;

-- ============================================
-- 5. Provjera (otkomentiraj za debug)
-- ============================================

-- SELECT policyname, roles, cmd
-- FROM pg_policies
-- WHERE tablename IN ('projects', 'project_files')
-- ORDER BY tablename, cmd;

-- Očekivani rezultat za projects:
--   projects_anon_insert             {anon}           INSERT
--   projects_authenticated_delete    {authenticated}  DELETE
--   projects_authenticated_insert    {authenticated}  INSERT
--   projects_authenticated_select    {authenticated}  SELECT
--   projects_authenticated_update    {authenticated}  UPDATE

-- Očekivani rezultat za project_files:
--   project_files_anon_insert             {anon}           INSERT
--   project_files_authenticated_delete    {authenticated}  DELETE
--   project_files_authenticated_insert    {authenticated}  INSERT
--   project_files_authenticated_select    {authenticated}  SELECT

-- SELECT proname, prosecdef
-- FROM pg_proc
-- WHERE proname = 'get_public_vr_project';
-- Očekivano: prosecdef = true
