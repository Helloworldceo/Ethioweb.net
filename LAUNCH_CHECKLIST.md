# Ethioweb Launch Checklist

## 1. Supabase

1. Create a new Supabase project.
2. In Supabase SQL Editor, run the SQL in `supabase/schema.sql`.
3. In Storage, confirm bucket `profile-files` exists.
4. In Project Settings > API, copy:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. In Authentication > URL Configuration, add:
   - `http://localhost:3000/auth/callback`
   - `https://ethioweb.net/auth/callback`
6. In Authentication > Providers:
   - Enable Google
   - Enable Facebook
   - Add each provider's client ID and secret

## 2. Local Env

Create `.env.local` from `.env.example` and set:

```bash
NEXT_PUBLIC_SITE_URL=https://ethioweb.net
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true
NEXT_PUBLIC_FACEBOOK_AUTH_ENABLED=true
```

## 3. GitHub

1. Create a new GitHub repository.
2. Run:

```bash
git add .
git commit -m "Initial Ethioweb platform"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## 4. Vercel

1. Import the GitHub repository into Vercel.
2. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL=https://ethioweb.net`
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
3. Deploy.
4. Add domains:
   - `ethioweb.net`
   - `www.ethioweb.net`

## 5. Namecheap DNS

In Namecheap Advanced DNS:

- `A` record:
  - Host: `@`
  - Value: `76.76.21.21`
- `CNAME` record:
  - Host: `www`
  - Value: `cname.vercel-dns.com`

## 6. Verify Production

1. Open `https://ethioweb.net`
2. Test signup/login
3. Test Google/Facebook auth
4. Test dashboard save
5. Test file upload
6. Test public profile page
7. Test search
