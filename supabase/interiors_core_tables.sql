-- ============================================
-- Supabase Interijere Core Tables Setup
-- ============================================
-- 
-- Ova SQL skripta kreira osnovne tablice za "Ani's Interijere" SaaS sistem:
-- - clients (klijenti)
-- - carpenters (stolari)
-- - projects (projekti)
-- 
-- Upute:
-- 1. Otvori Supabase Dashboard → SQL Editor
-- 2. Copy/paste cijeli sadržaj ovog fajla u SQL Editor
-- 3. Klikni "Run" ili pritisni Ctrl+Enter
-- 
-- ============================================

-- ============================================
-- Tablica: clients
-- ============================================
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  language text not null default 'hr',
  notes text
);

-- Unique index na email (osigurava da svaki klijent ima jedinstveni email)
create unique index if not exists clients_email_unique on clients(email);

-- Index na created_at (za sortiranje po datumu kreiranja)
create index if not exists clients_created_at_idx on clients(created_at);

-- ============================================
-- Tablica: carpenters
-- ============================================
create table if not exists carpenters (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  uses_corpus boolean not null default false,
  estimated_vr_projects_per_year integer,
  notes text
);

-- Unique index na email (osigurava da svaki stolar ima jedinstveni email)
create unique index if not exists carpenters_email_unique on carpenters(email);

-- Index na created_at (za sortiranje po datumu kreiranja)
create index if not exists carpenters_created_at_idx on carpenters(created_at);

-- ============================================
-- Tablica: projects
-- ============================================
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  user_type text not null,
  client_id uuid references clients(id) on delete set null,
  carpenter_id uuid references carpenters(id) on delete set null,
  drawn_by text not null default 'ani',
  uses_corpus boolean not null default false,
  wants_vr boolean not null default false,
  vr_location_preference text,
  vr_package_preference text,
  status text not null default 'inquiry',
  space_type text,
  area_m2 numeric(10,2),
  budget numeric(12,2),
  notes text,
  
  -- CHECK constraint-e za enum polja
  constraint project_user_type_check check (user_type in ('client', 'carpenter')),
  constraint project_drawn_by_check check (drawn_by in ('ani', 'carpenter')),
  constraint project_vr_location_preference_check check (
    vr_location_preference is null or 
    vr_location_preference in ('studio', 'client_home', 'unsure')
  ),
  constraint project_vr_package_preference_check check (
    vr_package_preference is null or 
    vr_package_preference in ('3d_vr', '3d_vr_online', 'unsure')
  ),
  constraint project_status_check check (
    status in ('inquiry', '3d_in_progress', '3d_done', 'vr_in_progress', 'vr_done', 'presented')
  )
);

-- Indexi za projects tablicu
create index if not exists projects_status_idx on projects(status);
create index if not exists projects_user_type_idx on projects(user_type);
create index if not exists projects_wants_vr_idx on projects(wants_vr);
create index if not exists projects_client_id_idx on projects(client_id);
create index if not exists projects_carpenter_id_idx on projects(carpenter_id);

-- ============================================
-- Tablica: project_files (povezane datoteke za projekte)
-- ============================================

create table if not exists public.project_files (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null references public.projects (id) on delete cascade,

  created_at timestamptz not null default timezone('utc'::text, now()),

  -- tip datoteke (tlocrt, inspiracija, foto, 3D eksport, VR asset...)
  file_type text not null check (
    file_type in (
      'plan',
      'inspiration',
      'space_photo',
      'kitchen_sketch',
      'carpenter_3d_export',
      'vr_asset',
      'other'
    )
  ),

  storage_bucket text not null,
  storage_path text not null,

  original_name text not null,
  mime_type text,
  size_bytes bigint,

  notes text
);

create index if not exists project_files_project_id_idx
  on public.project_files (project_id);

create index if not exists project_files_file_type_idx
  on public.project_files (file_type);

-- ============================================
-- VR model – vr_scenes, vr_appointments
-- ============================================
-- 
-- Tablice za upravljanje VR scenama i terminima za VR prezentacije:
-- - vr_scenes: VR scene povezane s projektima (SimLab paketi, WebXR scene, video ture, galerije slika)
-- - vr_appointments: termini za VR prezentacije povezani s vr_scenes

-- ============================================
-- Tablica: vr_scenes
-- ============================================
create table if not exists vr_scenes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  scene_type text not null check (
    scene_type in ('simlab_package', 'webxr_scene', 'video_tour', 'image_gallery', 'other')
  ),
  title text not null,
  description text,
  simlab_project_url text,
  webxr_url text,
  video_url text,
  cover_image_url text,
  storage_bucket text,
  storage_path text,
  notes text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

-- Index na project_id (za brzo dohvaćanje scena za određeni projekt)
create index if not exists vr_scenes_project_id_idx on vr_scenes(project_id);

-- ============================================
-- Tablica: vr_appointments
-- ============================================
create table if not exists vr_appointments (
  id uuid primary key default gen_random_uuid(),
  vr_scene_id uuid not null references vr_scenes(id) on delete cascade,
  scheduled_at timestamptz not null,
  location_preference text check (
    location_preference is null or
    location_preference in ('studio', 'client_home', 'online', 'other')
  ),
  status text not null check (
    status in ('scheduled', 'completed', 'cancelled', 'no_show')
  ),
  client_name text,
  client_email text,
  client_phone text,
  notes text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

-- Index na vr_scene_id (za brzo dohvaćanje termina za određenu scenu)
create index if not exists vr_appointments_vr_scene_id_idx on vr_appointments(vr_scene_id);

-- Index na scheduled_at (za sortiranje i filtriranje po datumu termina)
create index if not exists vr_appointments_scheduled_at_idx on vr_appointments(scheduled_at);

-- ============================================
-- Provjera: provjeri da li su tablice kreirane
-- ============================================
-- Otkomentiraj sljedeće linije za provjeru:
-- select * from clients;
-- select * from carpenters;
-- select * from projects;
-- select * from project_files;
-- select * from vr_scenes;
-- select * from vr_appointments;

