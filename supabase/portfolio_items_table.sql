-- ============================================
-- Supabase: portfolio_items table
-- ============================================
-- Phase 2A foundation for portfolio content (admin UI + public section later).
--
-- Upute:
-- 1. Supabase Dashboard → SQL Editor
-- 2. Zalijepi cijeli sadržaj i pokreni (Run).
-- 3. Nakon toga pokreni portfolio_items_rls_policies.sql
-- ============================================

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  title text not null,
  title_en text,
  description text,
  description_en text,

  category text not null
    constraint portfolio_items_category_check
    check (category in ('lrc', 'interiors', 'web-atelier')),

  tags text[] not null default '{}',

  image_url text,
  image_path text,
  image_alt text,
  image_alt_en text,

  display_order integer not null default 0,
  is_visible boolean not null default true,

  project_link text,
  client_name text,
  year_completed integer,

  created_by uuid references auth.users (id) on delete set null,
  updated_by uuid references auth.users (id) on delete set null
);

create index if not exists portfolio_items_visible_order_idx
  on public.portfolio_items (is_visible, display_order desc, created_at desc);

create index if not exists portfolio_items_category_idx
  on public.portfolio_items (category);

create index if not exists portfolio_items_created_at_idx
  on public.portfolio_items (created_at desc);

-- Keep updated_at in sync on UPDATE (application may also set updated_by)
create or replace function public.portfolio_items_set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists portfolio_items_touch_updated_at on public.portfolio_items;

create trigger portfolio_items_touch_updated_at
before update on public.portfolio_items
for each row
execute function public.portfolio_items_set_updated_at();

-- ============================================
-- Provjera (opcionalno):
-- select * from public.portfolio_items limit 1;
-- ============================================
