-- ============================================
-- Interijeri: ručna evidencija slanja molbe za recenziju (admin dashboard)
-- ============================================
-- Dodaje polje na projects za oznaku da je molba poslana (bez emaila / automatike).
-- Null = nije označeno kao poslano; ne-null = kada je admin uključio toggle.
--
-- Pokretanje: Supabase Dashboard → SQL Editor → Run
-- ============================================

alter table public.projects
  add column if not exists review_request_sent_at timestamptz null;

comment on column public.projects.review_request_sent_at is
  'Admin ručno označava da je klijentu poslana molba za recenziju; null = nije poslano / vraćeno.';
