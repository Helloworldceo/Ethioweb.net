-- Ethioweb core schema
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  full_name text not null,
  role text,
  location text,
  bio text,
  avatar_url text,
  visibility text not null default 'public' check (visibility in ('public', 'private')),
  verification_status text not null default 'none' check (verification_status in ('none', 'pending', 'verified')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profile_links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  label text not null,
  url text not null,
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.profile_assets (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  asset_kind text not null check (asset_kind in ('cv', 'portfolio', 'certificate', 'business_card', 'other')),
  title text not null,
  file_path text not null,
  public_url text,
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  title text not null,
  slug text unique not null,
  summary text not null,
  content text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  title text not null,
  slug text unique not null,
  excerpt text not null,
  content text,
  cover_image_url text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_username on public.profiles(username);
create index if not exists idx_profiles_search on public.profiles using gin (to_tsvector('simple', coalesce(full_name, '') || ' ' || coalesce(username, '')));

-- Storage bucket for file uploads:
-- insert into storage.buckets (id, name, public) values ('profile-files', 'profile-files', true);

alter table public.profiles enable row level security;
alter table public.profile_links enable row level security;
alter table public.profile_assets enable row level security;
alter table public.projects enable row level security;
alter table public.blog_posts enable row level security;

-- Owner policies
create policy "Users can manage own profile"
on public.profiles for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can manage own links"
on public.profile_links for all
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

create policy "Users can manage own assets"
on public.profile_assets for all
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

-- Public read policies
create policy "Public profiles are visible"
on public.profiles for select
using (visibility = 'public');

create policy "Public links are visible"
on public.profile_links for select
using (is_public = true);

create policy "Public assets are visible"
on public.profile_assets for select
using (is_public = true);

create policy "Published blog posts are visible"
on public.blog_posts for select
using (is_published = true);

create policy "Published projects are visible"
on public.projects for select
using (is_published = true);

insert into storage.buckets (id, name, public)
values ('profile-files', 'profile-files', true)
on conflict (id) do nothing;

create policy "Users can upload own files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'profile-files'
  and auth.uid()::text = split_part(name, '/', 1)
);

create policy "Users can update own files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'profile-files'
  and auth.uid()::text = split_part(name, '/', 1)
)
with check (
  bucket_id = 'profile-files'
  and auth.uid()::text = split_part(name, '/', 1)
);

create policy "Users can delete own files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'profile-files'
  and auth.uid()::text = split_part(name, '/', 1)
);

create policy "Public can read profile files"
on storage.objects for select
to public
using (bucket_id = 'profile-files');
