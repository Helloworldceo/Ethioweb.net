-- Mark the primary site owner as admin.
-- Safe to re-run; it only updates matching usernames.

update public.profiles
set role = 'admin'
where username = 'helloworldceo';
