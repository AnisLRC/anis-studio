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
-- Provjera: provjeri da li su tablice kreirane
-- ============================================
-- Otkomentiraj sljedeće linije za provjeru:
-- select * from clients;
-- select * from carpenters;
-- select * from projects;

