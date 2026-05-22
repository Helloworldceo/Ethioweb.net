-- Allow admin users to manage all blog posts.
-- Admin is defined by profiles.role = 'admin'.

drop policy if exists "Admins can manage all blog posts" on public.blog_posts;

create policy "Admins can manage all blog posts"
on public.blog_posts for all
to authenticated
using (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and lower(coalesce(p.role, '')) = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and lower(coalesce(p.role, '')) = 'admin'
  )
);
