-- ============================================
-- Migracija: Dodavanje statusa "archived" za projekte
-- ============================================
--
-- Svrha:
--   Omogućuje arhiviranje završenih ili starijih projekata
--   bez brisanja podataka, datoteka, klijenata ili stolara.
--
-- Upute:
--   1. Otvori Supabase Dashboard → SQL Editor
--   2. Copy/paste cijeli sadržaj ovog fajla u SQL Editor
--   3. Klikni "Run" ili pritisni Ctrl+Enter
--
-- ============================================

-- Ukloni postojeći CHECK constraint za status projekta
ALTER TABLE public.projects
  DROP CONSTRAINT IF EXISTS project_status_check;

-- Dodaj novi CHECK constraint koji uključuje 'archived'
ALTER TABLE public.projects
  ADD CONSTRAINT project_status_check CHECK (
    status IN (
      'inquiry',
      '3d_in_progress',
      '3d_done',
      'vr_in_progress',
      'vr_done',
      'presented',
      'archived'
    )
  );

-- ============================================
-- Provjera (opcionalno, otkomentiraj za debug)
-- ============================================
-- SELECT conname, consrc
-- FROM pg_constraint
-- WHERE conname = 'project_status_check';
