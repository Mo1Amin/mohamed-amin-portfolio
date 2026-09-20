-- Portfolio content schema.
--
-- Safe to run more than once: the types, tables, trigger and policies are all
-- guarded, so applying this to a project that already has it is a no-op rather
-- than an error.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace where n.nspname = 'public' and t.typname = 'project_status') then
    create type public.project_status as enum ('published', 'coming_soon', 'private', 'in_development');
  end if;
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace where n.nspname = 'public' and t.typname = 'project_locale') then
    create type public.project_locale as enum ('en', 'ar', 'sv');
  end if;
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace where n.nspname = 'public' and t.typname = 'project_link_kind') then
    create type public.project_link_kind as enum ('github', 'live', 'google_play', 'test_flight');
  end if;
  if not exists (select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace where n.nspname = 'public' and t.typname = 'project_media_kind') then
    create type public.project_media_kind as enum ('image', 'video', 'embed');
  end if;
end $$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  status public.project_status not null default 'coming_soon',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_translations (
  project_id uuid not null references public.projects(id) on delete cascade,
  locale public.project_locale not null,
  title text not null,
  short_summary text not null default '',
  role text not null default '',
  case_note text not null default '',
  problem text not null default '',
  solution text not null default '',
  challenges text not null default '',
  outcome text not null default '',
  primary key (project_id, locale)
);

create table if not exists public.project_technologies (
  project_id uuid not null references public.projects(id) on delete cascade,
  technology text not null,
  sort_order integer not null default 0,
  primary key (project_id, technology)
);

create table if not exists public.project_links (
  project_id uuid not null references public.projects(id) on delete cascade,
  kind public.project_link_kind not null,
  url text not null check (url ~ '^https://'),
  primary key (project_id, kind)
);

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  kind public.project_media_kind not null,
  url text not null,
  alt_en text not null default '',
  alt_ar text not null default '',
  alt_sv text not null default '',
  sort_order integer not null default 0
);

create or replace function public.set_updated_at() returns trigger
language plpgsql security invoker set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at before update on public.projects
for each row execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.project_translations enable row level security;
alter table public.project_technologies enable row level security;
alter table public.project_links enable row level security;
alter table public.project_media enable row level security;

drop policy if exists "Public can read visible projects" on public.projects;
create policy "Public can read visible projects" on public.projects for select
using (status in ('published', 'coming_soon', 'in_development'));
drop policy if exists "Owner can manage projects" on public.projects;
create policy "Owner can manage projects" on public.projects for all
using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);

drop policy if exists "Public can read visible translations" on public.project_translations;
create policy "Public can read visible translations" on public.project_translations for select
using (exists (select 1 from public.projects p where p.id = project_id and p.status in ('published', 'coming_soon', 'in_development')));
drop policy if exists "Owner can manage translations" on public.project_translations;
create policy "Owner can manage translations" on public.project_translations for all
using (exists (select 1 from public.projects p where p.id = project_id and p.owner_user_id = auth.uid()))
with check (exists (select 1 from public.projects p where p.id = project_id and p.owner_user_id = auth.uid()));

drop policy if exists "Public can read visible technologies" on public.project_technologies;
create policy "Public can read visible technologies" on public.project_technologies for select
using (exists (select 1 from public.projects p where p.id = project_id and p.status in ('published', 'coming_soon', 'in_development')));
drop policy if exists "Owner can manage technologies" on public.project_technologies;
create policy "Owner can manage technologies" on public.project_technologies for all
using (exists (select 1 from public.projects p where p.id = project_id and p.owner_user_id = auth.uid()))
with check (exists (select 1 from public.projects p where p.id = project_id and p.owner_user_id = auth.uid()));

drop policy if exists "Public can read visible links" on public.project_links;
create policy "Public can read visible links" on public.project_links for select
using (exists (select 1 from public.projects p where p.id = project_id and p.status in ('published', 'coming_soon', 'in_development')));
drop policy if exists "Owner can manage links" on public.project_links;
create policy "Owner can manage links" on public.project_links for all
using (exists (select 1 from public.projects p where p.id = project_id and p.owner_user_id = auth.uid()))
with check (exists (select 1 from public.projects p where p.id = project_id and p.owner_user_id = auth.uid()));

drop policy if exists "Public can read visible media" on public.project_media;
create policy "Public can read visible media" on public.project_media for select
using (exists (select 1 from public.projects p where p.id = project_id and p.status in ('published', 'coming_soon', 'in_development')));
drop policy if exists "Owner can manage media" on public.project_media;
create policy "Owner can manage media" on public.project_media for all
using (exists (select 1 from public.projects p where p.id = project_id and p.owner_user_id = auth.uid()))
with check (exists (select 1 from public.projects p where p.id = project_id and p.owner_user_id = auth.uid()));
