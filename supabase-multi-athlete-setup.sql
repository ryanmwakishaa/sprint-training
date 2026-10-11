-- Sprint Tracker multi-athlete account setup
-- Run this in Supabase SQL Editor before deploying the multi-athlete branch.
-- Every signup starts as an athlete. Promote your own account to coach manually (instructions below).

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'athlete' check (role in ('coach','athlete')),
  created_at timestamptz not null default now()
);

create table if not exists public.coach_athletes (
  coach_id uuid not null references public.profiles(id) on delete cascade,
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (coach_id, athlete_id),
  constraint coach_cannot_assign_self check (coach_id <> athlete_id)
);

create table if not exists public.tracker_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.coach_athletes enable row level security;
alter table public.tracker_state enable row level security;

-- Profiles are created by the trusted auth trigger; users cannot change their own role.
drop policy if exists "profiles_select_self_or_assigned_coach" on public.profiles;
create policy "profiles_select_self_or_assigned_coach"
on public.profiles for select to authenticated
using (
  id = auth.uid()
  or exists (
    select 1 from public.coach_athletes ca
    where ca.coach_id = auth.uid() and ca.athlete_id = profiles.id
  )
);

drop policy if exists "coach_athletes_select_participants" on public.coach_athletes;
create policy "coach_athletes_select_participants"
on public.coach_athletes for select to authenticated
using (coach_id = auth.uid() or athlete_id = auth.uid());

drop policy if exists "tracker_state_select_owner_or_assigned_coach" on public.tracker_state;
create policy "tracker_state_select_owner_or_assigned_coach"
on public.tracker_state for select to authenticated
using (
  user_id = auth.uid()
  or exists (
    select 1 from public.coach_athletes ca
    where ca.coach_id = auth.uid() and ca.athlete_id = tracker_state.user_id
  )
);

drop policy if exists "tracker_state_insert_owner" on public.tracker_state;
create policy "tracker_state_insert_owner"
on public.tracker_state for insert to authenticated
with check (user_id = auth.uid());

drop policy if exists "tracker_state_update_owner" on public.tracker_state;
create policy "tracker_state_update_owner"
on public.tracker_state for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "tracker_state_delete_owner" on public.tracker_state;
create policy "tracker_state_delete_owner"
on public.tracker_state for delete to authenticated
using (user_id = auth.uid());

-- New accounts are always athletes. Role promotion is deliberately not exposed to the browser.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''), 'athlete')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_sprint_tracker on auth.users;
create trigger on_auth_user_created_sprint_tracker
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Coach-only RPC: add an already-registered athlete by their account email.
create or replace function public.coach_add_athlete_by_email(athlete_email text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_id uuid;
begin
  if not exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'coach'
  ) then
    raise exception 'Only coach accounts can add athletes';
  end if;

  select u.id into target_id
  from auth.users u
  join public.profiles p on p.id = u.id
  where lower(u.email) = lower(trim(athlete_email))
    and p.role = 'athlete'
  limit 1;

  if target_id is null then
    raise exception 'No athlete account found for that email. Ask them to sign up first.';
  end if;

  insert into public.coach_athletes (coach_id, athlete_id)
  values (auth.uid(), target_id)
  on conflict do nothing;

  return target_id;
end;
$$;

revoke all on function public.coach_add_athlete_by_email(text) from public;
grant execute on function public.coach_add_athlete_by_email(text) to authenticated;

grant select on public.profiles to authenticated;
grant select on public.coach_athletes to authenticated;
grant select, insert, update, delete on public.tracker_state to authenticated;

-- SETUP AFTER RUNNING THIS FILE:
-- 1) Sign up in the app using your own email.
-- 2) In Supabase SQL Editor, run:
--    update public.profiles p set role = 'coach'
--    from auth.users u where p.id = u.id and lower(u.email) = lower('YOUR_EMAIL_HERE');
-- 3) Athletes sign up with their own emails. Add them from the Coach dashboard using that email.
