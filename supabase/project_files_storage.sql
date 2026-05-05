-- ============================================
-- Supabase Storage: project-files bucket + RLS
-- ============================================
-- • Bucket: project-files, public = false
--   Slike i dokumenti klijenata nisu javno dostupni. Pristup se vrši
--   isključivo putem potpisanih (signed) URL-ova s rokom trajanja 1 h.
-- • Anon INSERT: potrebno jer klijentski form šalje datoteke bez prijave.
-- • Anon SELECT: potrebno da admin frontend može generirati signed URL-ove
--   pozivom createSignedUrl() s anonimnim ključem.
-- • Authenticated SELECT: potrebno uz authenticated DELETE jer Supabase Storage
--   API koristi SELECT po objektu pri brisanju (bez ovoga remove() često pukne).
-- • Authenticated DELETE: admin može brisati datoteke testnih i neželjenih projekata.
-- • Tipovi datoteka: slike, PDF planovi, ZIP/arhive za 3D exportove.
-- • Limit: 20 MiB po datoteci.
--
-- Upute: SQL Editor → Run (sigurno pokrenuti više puta, sve je idempotentno).
-- ============================================

-- --- A) Bucket -----------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-files',
  'project-files',
  false,
  20971520, -- 20 MiB
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/bmp',
    'image/svg+xml',
    'application/pdf',
    'application/zip',
    'application/x-zip-compressed',
    'application/octet-stream'
  ]::text[]
)
on conflict (id) do update set
  public          = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- --- B) Policies na storage.objects --------------------------------------
-- Ukloni stare verzije politika ako postoje (idempotentno)
drop policy if exists "Allow anon uploads to project-files"       on storage.objects;
drop policy if exists "Allow anon read from project-files"        on storage.objects;
drop policy if exists "project_files_anon_insert"                 on storage.objects;
drop policy if exists "project_files_anon_select"                 on storage.objects;
drop policy if exists "project_files_authenticated_select"        on storage.objects;
drop policy if exists "project_files_authenticated_delete"        on storage.objects;

-- Anon upload: klijentski form može uploadati bez prijave
create policy "project_files_anon_insert"
on storage.objects
for insert
to anon
with check (bucket_id = 'project-files');

-- Anon read/select: admin frontend može generirati signed URL-ove s anon ključem
create policy "project_files_anon_select"
on storage.objects
for select
to anon
using (bucket_id = 'project-files');

-- Authenticated select: potrebno uz authenticated DELETE jer Storage API koristi
-- SELECT po objektu pri brisanju; bez ove politike remove() često vrati grešku
-- ili tiho ne obriše datoteku.
create policy "project_files_authenticated_select"
on storage.objects
for select
to authenticated
using (bucket_id = 'project-files');

-- Authenticated delete: admin može trajno obrisati datoteke testnih projekata
create policy "project_files_authenticated_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-files');

-- ============================================
-- Provjera: provjeri da li su politike i bucket kreirani
-- ============================================
-- Otkomentiraj za provjeru:
--
-- select id, name, public, file_size_limit from storage.buckets where id = 'project-files';
--
-- select policyname, cmd, roles
-- from pg_policies
-- where schemaname = 'storage'
--   and tablename = 'objects'
--   and policyname like 'project_files%';
--
-- Očekivani rezultat: 4 retka
--   project_files_anon_insert           INSERT  {anon}
--   project_files_anon_select           SELECT  {anon}
--   project_files_authenticated_select  SELECT  {authenticated}
--   project_files_authenticated_delete  DELETE  {authenticated}
