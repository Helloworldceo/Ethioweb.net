# Ethioweb Platform

Ethioweb is a modern digital identity platform for professionals and businesses.

This project includes:

- Public marketing website (Home, About, Services, Projects, Blog, Contact)
- Bilingual content on public/profile/auth/dashboard surfaces (English + Amharic)
- Public profile pages with unique links (`/u/[username]`)
- User dashboard with live profile and file management connected to APIs
- Search system (name or username)
- File upload flow (CV, portfolio, certificates, business card)
- Privacy controls architecture (public/private visibility)
- SEO setup (metadata, sitemap, robots)
- Supabase-backed auth/session/profile APIs

## Tech Stack

- Frontend: Next.js (App Router), React, Tailwind CSS
- Backend: Next.js Route Handlers (`app/api/*`)
- Database: PostgreSQL via Supabase (`supabase/schema.sql`)
- Auth (recommended): Supabase Auth with email/password + Google/Facebook OAuth
- Storage: Supabase Storage (`profile-files` bucket)

## Project Structure

```text
app/
	about/
	auth/login/
	auth/signup/
	blog/
	blog/[slug]/
	contact/
	dashboard/
	discover/
	projects/
	services/
	u/[username]/
	api/search/
	api/profiles/
	api/uploads/
	layout.tsx
	page.tsx
	sitemap.ts
	robots.ts

components/
	auth/
	dashboard/
	layout/
	sections/

lib/
	site.ts
	supabase/

supabase/
	schema.sql
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

3. Configure environment variables in `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://ethioweb.net
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

4. Run local development server:

```bash
npm run dev
```

## Database & Storage

1. Run SQL from `supabase/schema.sql` in your Supabase SQL editor.
2. Create storage bucket `profile-files`.
3. Configure RLS and storage policies for owner access + controlled public access.

## Authentication Flow (Recommended)

1. User signs up (email/password or OAuth with Google/Facebook).
2. Callback route exchanges auth code and stores session cookies.
3. Profile row is upserted in `profiles`.
4. Authenticated users are redirected to `/dashboard`.
5. In Supabase Auth, configure these redirect URLs:

```text
https://ethioweb.net/auth/callback
http://localhost:3000/auth/callback
```

6. Enable OAuth providers in Supabase:
- Google: add client ID/secret in Auth > Providers > Google
- Facebook: add app ID/secret in Auth > Providers > Facebook

## File Upload Flow

1. Dashboard sends multipart form data to `POST /api/uploads` with:
- `file`
- `kind` (`cv`, `portfolio`, `certificate`, `business_card`)
- `isPublic` (`true` or `false`)
2. API validates MIME type and uploads to `profile-files` bucket.
3. API returns `publicUrl` and storage path.
4. Save metadata to `profile_assets` table.
5. Use `is_public` to control public visibility.

## Search Flow

The current implementation exposes `GET /api/search?q=` and supports searching by full name or username. It reads from Supabase `profiles` when configured and falls back to demo data in local-only mode.

Production scaling path:

- Replace in-memory profile source with DB query to `profiles`
- Use PostgreSQL full text index (already included in schema)
- Add cursor pagination and request-level caching

## SEO Setup

- Global metadata in `app/layout.tsx`
- Dynamic `sitemap.xml` in `app/sitemap.ts`
- Dynamic `robots.txt` in `app/robots.ts`
- Per-page metadata on key routes

## Deployment (Vercel)

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add environment variables from `.env.local`.
4. Set production domain `ethioweb.net`.
5. Confirm OAuth redirect URLs for Google/Facebook.

## Namecheap Domain Launch (ethioweb.net)

If your app is deployed on Vercel and your domain is on Namecheap:

1. In Vercel project settings, add domain `ethioweb.net` and `www.ethioweb.net`.
2. In Namecheap DNS settings:
- Add `A` record for host `@` pointing to `76.76.21.21`.
- Add `CNAME` record for host `www` pointing to `cname.vercel-dns.com`.
3. Wait for DNS propagation (usually minutes, sometimes a few hours).
4. Set `NEXT_PUBLIC_SITE_URL=https://ethioweb.net` in production env.
5. Update Supabase Auth redirect URLs to include `https://ethioweb.net/auth/callback`.

## Future Expansion Roadmap

- AI-generated CV builder
- Portfolio templates marketplace
- Job matching engine
- Verification badges
- Team/company profiles
- Direct messaging
- Cloud storage plans
- Custom domains for user profiles
