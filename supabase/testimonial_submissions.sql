-- ============================================
-- Supabase: testimonial_submissions table + RLS
-- ============================================
-- Tablica za review/testimonial intake sustav.
-- Klijenti submittaju recenziju; sve ulazi kao 'pending'.
-- Admin moderira: pregled, edit javne verzije, approve/reject.
-- Ništa se ne objavljuje automatski.
--
-- Upute:
-- 1. Supabase Dashboard → SQL Editor
-- 2. Zalijepi cijeli sadržaj i pokreni (Run).
-- ============================================

-- ============================================
-- 1. Tablica
-- ============================================

create table if not exists public.testimonial_submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- Moderacijski status: svi submiti počinju kao 'pending'
  status        text not null default 'pending'
                constraint testimonial_submissions_status_check
                check (status in ('pending', 'approved', 'rejected')),

  -- Kategorija usluge; poklapa se s postojećim TypeScript tipovima u kodu
  category      text not null default 'interiors'
                constraint testimonial_submissions_category_check
                check (category in ('general', 'interiors', 'lrc', 'webAtelier')),

  -- Originalni klijentski tekst — nikad se ne mijenja nakon submita
  original_text text not null
                constraint testimonial_submissions_original_text_nonempty
                check (char_length(trim(original_text)) > 0),

  -- Interna admin verzija za eventualne ispravke gramatike/pravopisa
  -- NULL dok admin ne unese verziju; aplikacija koristi original_text kao fallback
  edited_text   text,

  -- Ime koje je klijent unio
  submitted_name text not null
                 constraint testimonial_submissions_submitted_name_nonempty
                 check (char_length(trim(submitted_name)) > 0),

  -- Kako klijent želi biti prikazan javno
  name_display_preference text not null default 'first_name_only'
                           constraint testimonial_submissions_name_pref_check
                           check (name_display_preference in ('full_name', 'first_name_only', 'initials', 'anonymous')),

  -- Javno ime koje prikazuje admin nakon moderacije (npr. "Marko K." ili "Anonimno")
  -- NULL dok admin ne postavi; aplikacija derivira iz submitted_name + name_display_preference
  public_display_name text,

  -- Interna email adresa — nikad se ne prikazuje javno
  email         text not null
                constraint testimonial_submissions_email_nonempty
                check (char_length(trim(email)) > 0),

  -- Opcionalna lokacija za prikaz (npr. "Zagreb, Hrvatska")
  location_display text,

  -- Interna admin bilješka — nije javna
  admin_note    text,

  -- Eksplicitna klijentska privola za javnu objavu
  -- Mora biti true; RLS i aplikacijski sloj to provjeravaju
  consent_public boolean not null default false,

  -- Moderacijski podaci
  approved_at   timestamptz,
  approved_by   uuid references auth.users(id) on delete set null,

  -- Ocjena (opcionalno; 1–5); null znači nije zadana
  rating        integer
                constraint testimonial_submissions_rating_check
                check (rating is null or rating between 1 and 5)
);

-- ============================================
-- 2. Indexi
-- ============================================

create index if not exists testimonial_submissions_status_created_idx
  on public.testimonial_submissions (status, created_at desc);

create index if not exists testimonial_submissions_category_idx
  on public.testimonial_submissions (category);

create index if not exists testimonial_submissions_created_at_idx
  on public.testimonial_submissions (created_at desc);

-- ============================================
-- 3. updated_at trigger
-- ============================================

create or replace function public.testimonial_submissions_set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists testimonial_submissions_touch_updated_at
  on public.testimonial_submissions;

create trigger testimonial_submissions_touch_updated_at
before update on public.testimonial_submissions
for each row
execute function public.testimonial_submissions_set_updated_at();

-- ============================================
-- 4. Row Level Security
-- ============================================

alter table public.testimonial_submissions enable row level security;

-- Idempotent re-run: brišemo politike ako već postoje
drop policy if exists "testimonial_submissions_anon_insert" on public.testimonial_submissions;
drop policy if exists "testimonial_submissions_authenticated_select" on public.testimonial_submissions;
drop policy if exists "testimonial_submissions_authenticated_update" on public.testimonial_submissions;

-- Anon: smije INSERT isključivo ako su zadovoljeni svi uvjeti
-- (DB constrainti provjeravaju format; RLS provjerava business pravila submita)
create policy "testimonial_submissions_anon_insert"
on public.testimonial_submissions
for insert
to anon
with check (
  status = 'pending'
  and consent_public = true
  and char_length(trim(original_text)) > 0
  and char_length(trim(submitted_name)) > 0
  and char_length(trim(email)) > 0
  and category in ('general', 'interiors', 'lrc', 'webAtelier')
);

-- Anon: nema SELECT, UPDATE ni DELETE
-- (izostavljanje politika = zabrana po defaultu kada je RLS uključen)

-- Authenticated (admin): čitanje svih redova
create policy "testimonial_submissions_authenticated_select"
on public.testimonial_submissions
for select
to authenticated
using (true);

-- Authenticated (admin): ažuriranje (approve/reject/edit)
-- Brisanje nije ponuđeno — koristiti status = 'rejected' umjesto DELETE
create policy "testimonial_submissions_authenticated_update"
on public.testimonial_submissions
for update
to authenticated
using (true)
with check (true);

-- ============================================
-- Provjera (opcionalno — otkomentiraj u SQL Editoru):
-- select policyname, cmd, roles from pg_policies
-- where schemaname = 'public' and tablename = 'testimonial_submissions';
--
-- select * from public.testimonial_submissions limit 5;
-- ============================================
