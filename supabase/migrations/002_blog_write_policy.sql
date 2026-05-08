-- Allow blog post authors to manage their own posts (read drafts, create, update, delete)
-- Run this in the Supabase SQL editor: https://supabase.com/dashboard/project/rryhecdoaivqjjctkdqb/sql

create policy "Authors can manage own blog posts"
on public.blog_posts for all
to authenticated
using (auth.uid() = author_id)
with check (auth.uid() = author_id);
