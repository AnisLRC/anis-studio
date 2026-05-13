-- ============================================
-- Public RPC: get_public_approved_testimonials
-- ============================================
-- SECURITY DEFINER RPC koji zaobilazi RLS i vraća samo javno sigurna polja
-- za approved recenzije. Ne izlaže PII/internal polja.
--
-- Upute:
-- 1. Supabase Dashboard → SQL Editor
-- 2. Zalijepi cijeli sadržaj i pokreni.
-- ============================================

create or replace function public.get_public_approved_testimonials()
returns table (
  id                   uuid,
  created_at           timestamptz,
  category             text,
  text_to_display      text,
  public_display_name  text,
  location_display     text,
  rating               integer
)
language sql
security definer
set search_path = public
stable
as $$
  select
    t.id,
    t.created_at,
    t.category::text as category,
    coalesce(
      nullif(btrim(t.edited_text), ''),
      nullif(btrim(t.original_text), '')
    ) as text_to_display,
    coalesce(
      nullif(btrim(t.public_display_name), ''),
      'Anonimno'
    ) as public_display_name,
    nullif(btrim(t.location_display), '') as location_display,
    case
      when t.rating between 1 and 5 then t.rating
      else null
    end as rating
  from public.testimonial_submissions t
  where t.status = 'approved'
    and coalesce(
      nullif(btrim(t.edited_text), ''),
      nullif(btrim(t.original_text), '')
    ) is not null
  order by t.approved_at asc nulls first, t.created_at asc;
$$;

revoke all on function public.get_public_approved_testimonials() from public;

grant execute on function public.get_public_approved_testimonials() to anon;
grant execute on function public.get_public_approved_testimonials() to authenticated;

-- ============================================
-- Provjera (opcionalno — otkomentiraj u SQL Editoru):
-- select * from public.get_public_approved_testimonials();
-- ============================================
