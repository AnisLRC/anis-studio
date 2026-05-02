-- ============================================
-- Supabase Storage: portfolio-images bucket + RLS
-- ============================================
-- • Bucket: portfolio-images, public = true — slike servira Supabase javnim URL-om (getPublicUrl),
--   ne treba široka public SELECT pravila koja bi anon korisnicima dopuštala LIST /pregled svih putanja u bucketu.
-- • Bez policy "portfolio_images_public_select"; postojeća se uklanja dropom ispod ako je još u bazi.
-- • Upload / update / delete: samo authenticated (nema anon upload, niti public update/delete).
-- • MIME: image/jpeg, image/png, image/webp
-- • Limit ~10 MB po datoteci
--
-- Upute: SQL Editor → Run (jednom).
-- Ako bucket već postoji, insert koristi ON CONFLICT za ažuriranje meta podataka.
-- ============================================

-- --- A) Bucket -----------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-images',
  'portfolio-images',
  true,
  10485760, -- 10 MiB
  array['image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- --- B) Policies na storage.objects --------------------------------------
drop policy if exists "portfolio_images_public_select" on storage.objects;
drop policy if exists "portfolio_images_authenticated_insert" on storage.objects;
drop policy if exists "portfolio_images_authenticated_update" on storage.objects;
drop policy if exists "portfolio_images_authenticated_delete" on storage.objects;

-- Nema CREATE za portfolio_images_public_select: bucket ostaje public radi javnih URL-ova (getPublicUrl),
-- ali se ne dodaje policy koja bi `public` roli dopuštala SELECT nad svim objektima (što uključuje listanje).

-- Samo prijavljeni korisnici uploadaju
create policy "portfolio_images_authenticated_insert"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'portfolio-images');

-- Zamjena metapodataka / sadržaja objekta (authenticated)
create policy "portfolio_images_authenticated_update"
on storage.objects
for update
to authenticated
using (bucket_id = 'portfolio-images')
with check (bucket_id = 'portfolio-images');

create policy "portfolio_images_authenticated_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'portfolio-images');

-- ============================================
-- Napomena: Ako insert u storage.buckets zakaže zbog verzije projekta,
-- kreiraj ručno u Dashboard → Storage → New bucket:
--   Name: portfolio-images
--   Public: da
--   Ograničenja MIME/veličine postavi u UI ako SQL meta ne radi.
-- Zatim pokreni samo dio B (policies) iz ovog fajla.
-- ============================================
