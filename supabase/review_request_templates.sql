-- ============================================
-- Globalni predlošci poruke za molbu o recenziji (admin)
-- ============================================
-- Jedan red po kategoriji (interiors / lrc / webAtelier).
-- Frontend trenutno koristi samo 'interiors'.
-- Anon nema pristup; authenticated admin SELECT/INSERT/UPDATE.
--
-- Supabase Dashboard → SQL Editor → Run (idempotentno).
-- ============================================

create table if not exists public.review_request_templates (
  category text primary key,
  message text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint review_request_templates_category_check check (
    category in ('interiors', 'lrc', 'webAtelier')
  )
);

comment on table public.review_request_templates is
  'Admin globalni predložak teksta za molbu o recenziji po kategoriji (nije per-project).';

-- updated_at pri UPDATE-u (INSERT koristi default)
create or replace function public.review_request_templates_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists review_request_templates_touch_updated_at
  on public.review_request_templates;

create trigger review_request_templates_touch_updated_at
  before update on public.review_request_templates
  for each row
  execute function public.review_request_templates_set_updated_at();

alter table public.review_request_templates enable row level security;

drop policy if exists review_request_templates_authenticated_select
  on public.review_request_templates;
drop policy if exists review_request_templates_authenticated_insert
  on public.review_request_templates;
drop policy if exists review_request_templates_authenticated_update
  on public.review_request_templates;

create policy review_request_templates_authenticated_select
  on public.review_request_templates
  for select
  to authenticated
  using (true);

create policy review_request_templates_authenticated_insert
  on public.review_request_templates
  for insert
  to authenticated
  with check (true);

create policy review_request_templates_authenticated_update
  on public.review_request_templates
  for update
  to authenticated
  using (true)
  with check (true);
