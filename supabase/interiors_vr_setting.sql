-- ============================================
-- Interiors VR Setting — Add interiors_vr_enabled
-- ============================================
--
-- Run this in Supabase SQL Editor before live QA.
--
-- Adds a boolean column to the settings table that controls
-- VR UI visibility across the Interiors inquiry flow and admin.
--
-- Default: false (VR OFF — recommended for production launch)
--
-- ============================================

ALTER TABLE settings
  ADD COLUMN IF NOT EXISTS interiors_vr_enabled boolean NOT NULL DEFAULT false;

UPDATE settings
SET interiors_vr_enabled = false
WHERE id = 1;

-- Verify:
-- SELECT id, interiors_vr_enabled FROM settings WHERE id = 1;
