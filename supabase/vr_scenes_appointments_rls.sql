-- ============================================
-- VR Security: RLS za vr_scenes i vr_appointments
--              + SECURITY DEFINER RPC za public VR stranicu
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

ALTER TABLE public.vr_scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vr_appointments ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. RLS politike za vr_scenes
-- ============================================

-- Ukloni stare politike ako postoje (idempotentnost)
DROP POLICY IF EXISTS vr_scenes_authenticated_select ON public.vr_scenes;
DROP POLICY IF EXISTS vr_scenes_authenticated_insert ON public.vr_scenes;
DROP POLICY IF EXISTS vr_scenes_authenticated_update ON public.vr_scenes;
DROP POLICY IF EXISTS vr_scenes_authenticated_delete ON public.vr_scenes;

-- anon SELECT: ne dodajemo.
-- PublicProjectVrPage koristi SECURITY DEFINER RPC (vidjeti sekciju 4).
--
-- anon INSERT: ne dodajemo. Nema javne forme za kreiranje scena.
-- anon UPDATE: ne dodajemo.
-- anon DELETE: ne dodajemo.

-- Authenticated SELECT: admin čita sve VR scene projekta
CREATE POLICY vr_scenes_authenticated_select
  ON public.vr_scenes
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated INSERT: admin kreira novu VR scenu
CREATE POLICY vr_scenes_authenticated_insert
  ON public.vr_scenes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated UPDATE: admin mijenja URL-ove, tip, naslov scene
CREATE POLICY vr_scenes_authenticated_update
  ON public.vr_scenes
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated DELETE: belt-and-suspenders uz DB kaskadu iz projects
CREATE POLICY vr_scenes_authenticated_delete
  ON public.vr_scenes
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- 3. RLS politike za vr_appointments
-- ============================================

-- Ukloni stare politike ako postoje (idempotentnost)
DROP POLICY IF EXISTS vr_appointments_authenticated_select ON public.vr_appointments;
DROP POLICY IF EXISTS vr_appointments_authenticated_insert ON public.vr_appointments;
DROP POLICY IF EXISTS vr_appointments_authenticated_update ON public.vr_appointments;
DROP POLICY IF EXISTS vr_appointments_authenticated_delete ON public.vr_appointments;

-- anon SELECT: ne dodajemo.
-- vr_appointments sadrži PII (client_name, client_email, client_phone).
-- PublicProjectVrPage koristi SECURITY DEFINER RPC koji ne vraća PII (vidjeti sekciju 5).
--
-- anon INSERT: ne dodajemo. Nema javne booking forme.
-- anon UPDATE: ne dodajemo.
-- anon DELETE: ne dodajemo.

-- Authenticated SELECT: admin čita sve termine za VR scenu
CREATE POLICY vr_appointments_authenticated_select
  ON public.vr_appointments
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated INSERT: admin kreira novi termin iz admin panela
CREATE POLICY vr_appointments_authenticated_insert
  ON public.vr_appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated UPDATE: admin mijenja status (completed, cancelled, no_show)
CREATE POLICY vr_appointments_authenticated_update
  ON public.vr_appointments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated DELETE: belt-and-suspenders uz DB kaskadu iz vr_scenes
CREATE POLICY vr_appointments_authenticated_delete
  ON public.vr_appointments
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- 4. SECURITY DEFINER RPC: get_public_vr_scenes
-- ============================================
--
-- Svrha:
--   PublicProjectVrPage treba prikazati VR scene klijentu.
--   Direktni anon SELECT na vr_scenes izlaže interna polja
--   (storage_bucket, storage_path, notes). Ovaj RPC vraća samo
--   javno sigurna polja potrebna za prikaz.
--
-- Vraća:
--   id, project_id, scene_type, title, description,
--   simlab_project_url, webxr_url, video_url, cover_image_url
--
-- Ne vraća:
--   storage_bucket, storage_path, notes
--
-- Uvjet:
--   projects.wants_vr = true — ako projekt nije VR, RPC ne vraća ništa.
--
-- SECURITY DEFINER: radi kao DB owner, zaobilazi RLS — anon može pozvati
-- RPC bez anon SELECT politike na vr_scenes tablici.
-- ============================================

CREATE OR REPLACE FUNCTION public.get_public_vr_scenes(
  p_project_id uuid
)
RETURNS TABLE (
  id                 uuid,
  project_id         uuid,
  scene_type         text,
  title              text,
  description        text,
  simlab_project_url text,
  webxr_url          text,
  video_url          text,
  cover_image_url    text
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT
    s.id,
    s.project_id,
    s.scene_type,
    s.title,
    s.description,
    s.simlab_project_url,
    s.webxr_url,
    s.video_url,
    s.cover_image_url
  FROM public.vr_scenes s
  INNER JOIN public.projects p ON p.id = s.project_id
  WHERE s.project_id = p_project_id
    AND p.wants_vr = true
  ORDER BY s.created_at ASC;
$$;

-- Permissions za get_public_vr_scenes
REVOKE ALL ON FUNCTION public.get_public_vr_scenes(uuid)
  FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.get_public_vr_scenes(uuid)
  TO anon, authenticated;

-- ============================================
-- 5. SECURITY DEFINER RPC: get_public_vr_appointments
-- ============================================
--
-- Svrha:
--   PublicProjectVrPage prikazuje klijentu zakazane termine.
--   Direktni anon SELECT na vr_appointments izlaže PII
--   (client_name, client_email, client_phone) i interne notes.
--   Ovaj RPC vraća samo javno sigurna polja i filtrira
--   samo scheduled termine za VR projekte.
--
-- Vraća:
--   id, vr_scene_id, scheduled_at, location_preference,
--   status, vr_link
--
-- Ne vraća:
--   client_name, client_email, client_phone, notes
--
-- Uvjeti:
--   status = 'scheduled'
--   join na vr_scenes i projects
--   projekt mora imati wants_vr = true
--
-- SECURITY DEFINER: radi kao DB owner, zaobilazi RLS — anon može pozvati
-- RPC bez anon SELECT politike na vr_appointments tablici.
-- ============================================

CREATE OR REPLACE FUNCTION public.get_public_vr_appointments(
  p_scene_id uuid
)
RETURNS TABLE (
  id                  uuid,
  vr_scene_id         uuid,
  scheduled_at        timestamptz,
  location_preference text,
  status              text,
  vr_link             text
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT
    a.id,
    a.vr_scene_id,
    a.scheduled_at,
    a.location_preference,
    a.status,
    a.vr_link
  FROM public.vr_appointments a
  INNER JOIN public.vr_scenes s ON s.id = a.vr_scene_id
  INNER JOIN public.projects p ON p.id = s.project_id
  WHERE a.vr_scene_id = p_scene_id
    AND a.status = 'scheduled'
    AND p.wants_vr = true
  ORDER BY a.scheduled_at ASC;
$$;

-- Permissions za get_public_vr_appointments
REVOKE ALL ON FUNCTION public.get_public_vr_appointments(uuid)
  FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.get_public_vr_appointments(uuid)
  TO anon, authenticated;

-- ============================================
-- 6. Provjera (otkomentiraj za debug)
-- ============================================

-- SELECT policyname, roles, cmd
-- FROM pg_policies
-- WHERE tablename IN ('vr_scenes', 'vr_appointments')
-- ORDER BY tablename, cmd;

-- Očekivani rezultat za vr_scenes:
--   vr_scenes_authenticated_delete    {authenticated}  DELETE
--   vr_scenes_authenticated_insert    {authenticated}  INSERT
--   vr_scenes_authenticated_select    {authenticated}  SELECT
--   vr_scenes_authenticated_update    {authenticated}  UPDATE

-- Očekivani rezultat za vr_appointments:
--   vr_appointments_authenticated_delete    {authenticated}  DELETE
--   vr_appointments_authenticated_insert    {authenticated}  INSERT
--   vr_appointments_authenticated_select    {authenticated}  SELECT
--   vr_appointments_authenticated_update    {authenticated}  UPDATE

-- SELECT proname, prosecdef
-- FROM pg_proc
-- WHERE proname IN ('get_public_vr_scenes', 'get_public_vr_appointments');
-- Očekivano: prosecdef = true za obje funkcije
