create table if not exists public.verification_requests (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  note text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.team_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  slug text unique not null,
  description text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.team_profiles(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text,
  created_at timestamptz not null default now(),
  unique(team_id, profile_id)
);

create table if not exists public.user_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.custom_domains (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  domain text not null unique,
  verification_token text not null default encode(gen_random_bytes(12), 'hex'),
  status text not null default 'pending' check (status in ('pending', 'verified', 'failed')),
  created_at timestamptz not null default now(),
  verified_at timestamptz
);

alter table public.verification_requests enable row level security;
alter table public.team_profiles enable row level security;
alter table public.team_members enable row level security;
alter table public.user_messages enable row level security;
alter table public.custom_domains enable row level security;

create policy "Users can request own verification"
on public.verification_requests for insert
to authenticated
with check (auth.uid() = profile_id);

create policy "Users can read own verification requests"
on public.verification_requests for select
to authenticated
using (auth.uid() = profile_id);

create policy "Owners can manage team profiles"
on public.team_profiles for all
to authenticated
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "Public team profiles visible"
on public.team_profiles for select
to public
using (is_public = true);

create policy "Owners can manage team members"
on public.team_members for all
to authenticated
using (
  exists (
    select 1 from public.team_profiles t
    where t.id = team_id and t.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.team_profiles t
    where t.id = team_id and t.owner_id = auth.uid()
  )
);

create policy "Team members readable when parent team is public"
on public.team_members for select
to public
using (
  exists (
    select 1 from public.team_profiles t
    where t.id = team_id and t.is_public = true
  )
);

create policy "Users can send messages"
on public.user_messages for insert
to authenticated
with check (auth.uid() = sender_id);

create policy "Users can read own messages"
on public.user_messages for select
to authenticated
using (auth.uid() = sender_id or auth.uid() = recipient_id);

create policy "Users can manage own custom domains"
on public.custom_domains for all
to authenticated
using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);
