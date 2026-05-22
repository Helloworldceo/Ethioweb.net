"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Camera, CheckCircle2, Circle, Copy, Eye, EyeOff, FileText, FolderKanban, Gift, Link2, MapPin, PenLine, Trash2, UploadCloud, UserRound } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";

type ProfileRow = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  role: string | null;
  location: string | null;
  bio: string | null;
  visibility: "public" | "private";
};

type BlogPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
};

type AssetRow = {
  id: string;
  asset_kind: string;
  title: string;
  public_url: string | null;
  is_public: boolean;
};

const kinds = [
  { value: "cv", label: "CV" },
  { value: "portfolio", label: "Portfolio" },
  { value: "certificate", label: "Certificate" },
  { value: "business_card", label: "Business Card" },
];

type DashboardClientProps = {
  initialProfile: ProfileRow | null;
  initialAssets: AssetRow[];
  initialBlogPosts: BlogPostRow[];
  isAdmin: boolean;
};

export function DashboardClient({ initialProfile, initialAssets, initialBlogPosts, isAdmin }: DashboardClientProps) {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<ProfileRow | null>(initialProfile);
  const [assets, setAssets] = useState<AssetRow[]>(initialAssets);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);

  const [form, setForm] = useState({
    fullName: initialProfile?.full_name || "",
    username: initialProfile?.username || "",
    avatarUrl: initialProfile?.avatar_url || null,
    role: initialProfile?.role || "",
    location: initialProfile?.location || "",
    bio: initialProfile?.bio || "",
    visibility: initialProfile?.visibility || ("public" as "public" | "private"),
  });

  const [uploadKind, setUploadKind] = useState("cv");
  const [uploadPublic, setUploadPublic] = useState(true);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Blog management (author-owned with admin override)
  const [blogPosts, setBlogPosts] = useState<BlogPostRow[]>(initialBlogPosts);
  const [blogEditing, setBlogEditing] = useState(false);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogForm, setBlogForm] = useState({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    is_published: false,
  });

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function startNewPost() {
    setBlogForm({ id: "", title: "", slug: "", excerpt: "", content: "", is_published: false });
    setBlogEditing(true);
  }

  function startEditPost(post: BlogPostRow) {
    setBlogForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content ?? "",
      is_published: post.is_published,
    });
    setBlogEditing(true);
  }

  async function loadBlogPosts() {
    const response = await fetch("/api/admin/blog");
    if (!response.ok) return;
    const payload = (await response.json()) as { posts: BlogPostRow[] };
    setBlogPosts(payload.posts ?? []);
  }

  async function saveBlogPost(event: FormEvent) {
    event.preventDefault();
    setBlogSaving(true);
    setError(null);

    const method = blogForm.id ? "PATCH" : "POST";
    const response = await fetch("/api/admin/blog", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogForm),
    });

    setBlogSaving(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: "Save failed" }))) as { error?: string };
      setError(payload.error ?? "Save failed");
      return;
    }

    setStatus(blogForm.id ? "Post updated." : "Post created.");
    setBlogEditing(false);
    await loadBlogPosts();
  }

  async function deleteBlogPost(id: string) {
    setError(null);
    const response = await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: "Delete failed" }))) as { error?: string };
      setError(payload.error ?? "Delete failed");
      return;
    }

    setStatus("Post deleted.");
    await loadBlogPosts();
  }

  async function loadProfile() {
    setError(null);
    const response = await fetch("/api/profiles", { cache: "no-store" });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: "Unable to load profile" }))) as {
        error?: string;
      };
      setError(payload.error || "Unable to load profile");
      setLoading(false);
      return;
    }

    const payload = (await response.json()) as {
      profile: ProfileRow | null;
      assets: AssetRow[];
    };

    setProfile(payload.profile);
    setAssets(payload.assets || []);

    if (payload.profile) {
      setForm({
        fullName: payload.profile.full_name || "",
        username: payload.profile.username || "",
        avatarUrl: payload.profile.avatar_url || null,
        role: payload.profile.role || "",
        location: payload.profile.location || "",
        bio: payload.profile.bio || "",
        visibility: payload.profile.visibility || "public",
      });
    }

    setLoading(false);
  }

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setStatus(null);

    const response = await fetch("/api/profiles", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: "Unable to save profile" }))) as {
        error?: string;
      };
      setError(payload.error || "Unable to save profile");
      return;
    }

    setStatus("Profile saved successfully.");
    await loadProfile();
  }

  async function uploadAsset(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setStatus(null);

    if (!uploadFile) {
      setError("Please choose a file before upload.");
      return;
    }

    setUploading(true);

    const data = new FormData();
    data.append("file", uploadFile);
    data.append("kind", uploadKind);
    data.append("isPublic", String(uploadPublic));

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: data,
    });

    setUploading(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: "Upload failed" }))) as {
        error?: string;
      };
      setError(payload.error || "Upload failed");
      return;
    }

    setStatus("File uploaded successfully.");
    setUploadFile(null);
    await loadProfile();
  }

  async function uploadAvatar(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setStatus(null);

    if (!avatarFile) {
      setError("Please choose a profile photo first.");
      return;
    }

    setUploading(true);

    const data = new FormData();
    data.append("file", avatarFile);
    data.append("kind", "avatar");
    data.append("isPublic", "true");

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: data,
    });

    setUploading(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: "Upload failed" }))) as {
        error?: string;
      };
      setError(payload.error || "Upload failed");
      return;
    }

    setStatus("Profile photo updated.");
    setAvatarFile(null);
    await loadProfile();
  }

  const avatarFallback = (form.fullName || profile?.full_name || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

  const groupedAssets = {
    cv: assets.filter((item) => item.asset_kind === "cv"),
    portfolio: assets.filter((item) => item.asset_kind === "portfolio"),
    certificate: assets.filter((item) => item.asset_kind === "certificate"),
    business_card: assets.filter((item) => item.asset_kind === "business_card"),
  };

  const checklist = [
    {
      label: "Add full name",
      done: Boolean(form.fullName.trim()),
    },
    {
      label: "Set username",
      done: Boolean(form.username.trim()),
    },
    {
      label: "Upload profile photo",
      done: Boolean(form.avatarUrl),
    },
    {
      label: "Write your bio",
      done: Boolean(form.bio.trim()),
    },
    {
      label: "Add role and location",
      done: Boolean(form.role.trim() && form.location.trim()),
    },
    {
      label: "Upload at least one public file",
      done: assets.some((item) => item.is_public),
    },
  ];

  const completeCount = checklist.filter((item) => item.done).length;
  const completionPct = Math.round((completeCount / checklist.length) * 100);
  const referralLink = form.username ? `https://ethioweb.net/auth/signup?ref=${form.username}` : "";

  async function copyReferralLink() {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopiedReferral(true);
    window.setTimeout(() => setCopiedReferral(false), 1500);
  }

  async function requestVerification() {
    if (!profile?.id) return;
    setError(null);
    const response = await fetch("/api/verification/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profileId: profile.id,
        justification: "Requesting badge review for public profile.",
      }),
    });

    const payload = (await response.json().catch(() => ({ message: "Unable to submit request" }))) as {
      error?: string;
      message?: string;
    };

    if (!response.ok) {
      setError(payload.error ?? "Unable to submit request");
      return;
    }

    setStatus(payload.message ?? "Verification request submitted.");
  }

  if (loading) {
    return <section className="container-wrap py-12">Loading dashboard...</section>;
  }

  return (
    <section className="container-wrap py-12">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="chip">{t("User Dashboard", "የተጠቃሚ ዳሽቦርድ")}</p>
          <h1 className="heading-display mt-3 text-4xl font-black">{t("Manage your professional profile", "ፕሮፋይልዎን ያስተዳድሩ")}</h1>
        </div>
        {profile?.username && <Link href={`/u/${profile.username}`} className="btn-secondary">View Public Profile</Link>}
      </header>

      {error && <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {status && <p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{status}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        <article className="card p-5 md:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
                <Gift className="h-4 w-4" /> Referral loop
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Invite peers with your link. As referrals launch, early users get priority verification queue access.
              </p>
            </div>
            <button
              type="button"
              onClick={copyReferralLink}
              disabled={!referralLink}
              className="btn-secondary inline-flex items-center gap-2 text-sm"
            >
              <Copy className="h-4 w-4" /> {copiedReferral ? "Copied" : "Copy invite link"}
            </button>
          </div>
          {referralLink && <p className="mt-3 text-xs text-[var(--muted)]">{referralLink}</p>}
        </article>

        <article className="card p-5 md:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--muted)]">Profile completion</p>
              <h2 className="heading-display mt-1 text-2xl font-black">{completionPct}% complete</h2>
            </div>
            <p className="chip">{completeCount}/{checklist.length} tasks</p>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[var(--line)]">
            <div
              className="h-full rounded-full bg-[var(--brand)] transition-all duration-300"
              style={{ width: `${completionPct}%` }}
            />
          </div>
          <ul className="mt-4 grid gap-2 md:grid-cols-2">
            {checklist.map((item) => (
              <li key={item.label} className="flex items-center gap-2 rounded-xl border border-[var(--line)] p-3 text-sm">
                {item.done ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Circle className="h-4 w-4 text-[var(--muted)]" />
                )}
                <span className={item.done ? "text-[var(--ink)]" : "text-[var(--muted)]"}>{item.label}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="card overflow-hidden p-0 md:col-span-2">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.24),_transparent_45%),linear-gradient(135deg,#0f172a,#1f2937)] px-6 py-8 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                {form.avatarUrl ? (
                  <img
                    src={form.avatarUrl}
                    alt={form.fullName || "Profile photo"}
                    className="h-24 w-24 rounded-3xl border border-white/20 object-cover shadow-lg"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-2xl font-black">
                    {avatarFallback}
                  </div>
                )}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{t("Your profile", "ፕሮፋይልዎ")}</p>
                  <h2 className="mt-2 text-3xl font-black">{form.fullName || t("Your name", "ስምዎ")}</h2>
                  <p className="mt-1 text-sm font-semibold text-teal-200">@{form.username || "username"}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/80">
                    <span className="inline-flex items-center gap-2"><UserRound className="h-4 w-4" />{form.role || t("Professional", "ባለሙያ")}</span>
                    {form.location && <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />{form.location}</span>}
                  </div>
                </div>
              </div>

              <div className="max-w-md text-sm leading-7 text-white/80">
                {form.bio || t("Add your role, location, and short bio to shape the public card people see first.", "ስራዎን፣ ቦታዎን እና አጭር ማብራሪያዎን ያስገቡ ሰዎች የሚያዩትን የህዝብ ፕሮፋይል ለማዘጋጀት።")}
              </div>
            </div>
          </div>
        </article>

        <article id="profile-basics" className="card p-6 md:col-span-2">
          <h2 className="heading-display text-2xl font-bold">{t("Profile Basics", "የፕሮፋይል መረጃ")}</h2>
          <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={saveProfile}>
            <div>
              <input
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
                value={form.fullName}
                onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                placeholder="Full name"
                required
              />
              <p className="mt-2 text-xs leading-6 text-[var(--muted)]">
                This name appears on your profile and any course certificates.
              </p>
            </div>
            <input
              className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
              value={form.username}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  username: event.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""),
                }))
              }
              placeholder="Username"
              required
            />
            <input
              className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
              value={form.role}
              onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
              placeholder="Role"
            />
            <input
              className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
              value={form.location}
              onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
              placeholder="Location"
            />
            <select
              className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
              value={form.visibility}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  visibility: event.target.value as "public" | "private",
                }))
              }
            >
              <option value="public">{t("Public", "ይፋ")}</option>
              <option value="private">{t("Private", "ግል")}</option>
            </select>
            <div className="hidden md:block" />
            <textarea
              className="md:col-span-2 h-24 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
              value={form.bio}
              onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
              placeholder="Short bio"
            />
            <button className="btn-primary md:col-span-2 w-fit" type="submit" disabled={saving}>
              {saving ? t("Saving...", "በማስቀመጥ ላይ...") : t("Save Profile", "ፕሮፋይል አስቀምጥ")}
            </button>
          </form>
        </article>

        <article className="card p-6">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-[var(--brand)]" />
            <h3 className="heading-display text-xl font-bold">{t("Profile Photo", "የፕሮፋይል ፎቶ")}</h3>
          </div>

          <form className="mt-4 space-y-3" onSubmit={uploadAvatar}>
            <input
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={(event) => setAvatarFile(event.target.files?.[0] || null)}
            />
            <button className="btn-primary w-full" type="submit" disabled={uploading}>
              {uploading ? t("Uploading...", "በማስገባት ላይ...") : t("Upload Profile Photo", "የፕሮፋይል ፎቶ አስገባ")}
            </button>
          </form>
        </article>

        <article className="card p-6">
          <div className="flex items-center gap-2">
            <UploadCloud className="h-4 w-4 text-[var(--brand)]" />
            <h3 className="heading-display text-xl font-bold">{t("Upload Files", "ፋይሎች ማስገባት")}</h3>
          </div>

          <form className="mt-4 space-y-3" onSubmit={uploadAsset}>
            <select
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
              value={uploadKind}
              onChange={(event) => setUploadKind(event.target.value)}
            >
              {kinds.map((kind) => (
                <option key={kind.value} value={kind.value}>
                  {kind.label}
                </option>
              ))}
            </select>
            <input
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(event) => setUploadFile(event.target.files?.[0] || null)}
            />
            <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <input
                type="checkbox"
                checked={uploadPublic}
                onChange={(event) => setUploadPublic(event.target.checked)}
              />
              {t("Make this file public", "ይህን ፋይል ይፋ አድርግ")}
            </label>
            <button className="btn-primary w-full" type="submit" disabled={uploading}>
              {uploading ? t("Uploading...", "በማስገባት ላይ...") : t("Upload", "አስገባ")}
            </button>
          </form>
        </article>

        <article className="card p-6">
          <h3 className="heading-display text-xl font-bold">{t("Current Assets", "ያሉ ፋይሎች")}</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            {assets.length === 0 && <li>No uploads yet.</li>}
            {assets.map((item) => (
              <li key={item.id} className="rounded-xl border border-[var(--line)] p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-[var(--ink)]">{item.title}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold">
                    {item.is_public ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    {item.is_public ? "Public" : "Private"}
                  </span>
                </div>
                <p className="mt-1 uppercase tracking-wide text-xs">{item.asset_kind}</p>
                {item.public_url && (
                  <a className="mt-2 inline-flex text-xs font-semibold text-[var(--brand)]" href={item.public_url} target="_blank" rel="noreferrer">
                    Open file
                  </a>
                )}
              </li>
            ))}
          </ul>
        </article>

        <article className="card p-6 md:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <FileText className="h-4 w-4 text-[var(--brand)]" />
            <FolderKanban className="h-4 w-4 text-[var(--brand)]" />
            <Link2 className="h-4 w-4 text-[var(--brand)]" />
            <p className="text-sm text-[var(--muted)]">
              CV: {groupedAssets.cv.length} • Portfolio: {groupedAssets.portfolio.length} • Certificates: {groupedAssets.certificate.length} • Business Cards: {groupedAssets.business_card.length}
            </p>
          </div>
        </article>

        <article id="blog-manager" className="card p-6 md:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <PenLine className="h-4 w-4 text-[var(--brand)]" />
              <h2 className="heading-display text-2xl font-bold">{isAdmin ? "All Blog Posts" : "My Blog Posts"}</h2>
              <span className="chip text-xs">{isAdmin ? "Admin can edit all" : "Author only edits"}</span>
            </div>
            {!blogEditing && (
              <button type="button" className="btn-primary text-sm" onClick={startNewPost}>
                + New Post
              </button>
            )}
          </div>

          {blogEditing && (
            <form className="mb-6 grid gap-3 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4" onSubmit={saveBlogPost}>
              <h3 className="font-bold">{blogForm.id ? "Edit Post" : "New Post"}</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
                  value={blogForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setBlogForm((prev) => ({
                      ...prev,
                      title,
                      slug: prev.id ? prev.slug : generateSlug(title),
                    }));
                  }}
                  placeholder="Post title"
                  required
                />
                <input
                  className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
                  value={blogForm.slug}
                  onChange={(e) =>
                    setBlogForm((prev) => ({
                      ...prev,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                    }))
                  }
                  placeholder="url-slug"
                  required
                />
              </div>
              <textarea
                className="h-20 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Short excerpt / summary shown on the blog list"
                required
              />
              <textarea
                className="h-56 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 font-mono text-sm"
                value={blogForm.content}
                onChange={(e) => setBlogForm((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Full article content..."
              />
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={blogForm.is_published}
                  onChange={(e) => setBlogForm((prev) => ({ ...prev, is_published: e.target.checked }))}
                />
                Publish immediately (visible to all visitors)
              </label>
              <div className="flex gap-2">
                <button className="btn-primary text-sm" type="submit" disabled={blogSaving}>
                  {blogSaving ? "Saving..." : blogForm.id ? "Update Post" : "Create Post"}
                </button>
                <button
                  className="btn-secondary text-sm"
                  type="button"
                  onClick={() => setBlogEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <ul className="space-y-2">
            {blogPosts.length === 0 && !blogEditing && (
              <li className="rounded-xl border border-dashed border-[var(--line)] p-6 text-center text-sm text-[var(--muted)]">
                No blog posts yet. Click &ldquo;+ New Post&rdquo; to write your first article.
              </li>
            )}
            {blogPosts.map((post) => (
              <li key={post.id} className="rounded-xl border border-[var(--line)] p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-[var(--ink)]">{post.title}</p>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">
                      /{post.slug} &nbsp;·&nbsp;{" "}
                      {post.published_at?.slice(0, 10) ?? post.created_at.slice(0, 10)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        post.is_published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </span>
                    <button
                      type="button"
                      className="text-xs font-semibold text-[var(--brand)]"
                      onClick={() => startEditPost(post)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-500"
                      onClick={() => deleteBlogPost(post.id)}
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article id="settings" className="card p-6 md:col-span-2">
          <h2 className="heading-display text-2xl font-bold">{t("Settings & Privacy", "ቅንብሮች እና ግላዊነት")}</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {t(
              "Manage your account visibility from Profile Basics and review global privacy details from the dedicated policy page.",
              "የመለያ ታይነትዎን ከፕሮፋይል መረጃ ይቆጣጠሩ እና የግላዊነት ዝርዝሮችን ከፖሊሲ ገጽ ይመልከቱ።",
            )}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/privacy" className="btn-secondary text-sm">Privacy Policy</Link>
            <Link href="/terms" className="btn-secondary text-sm">Terms</Link>
            <Link href="/dashboard/cv-builder" className="btn-secondary text-sm">AI CV Builder</Link>
            <Link href="/portfolio-templates" className="btn-secondary text-sm">Portfolio Templates</Link>
            <Link href="/dashboard/domains" className="btn-secondary text-sm">Custom Domains</Link>
            <Link href="/messages" className="btn-secondary text-sm">Messaging</Link>
            <button type="button" className="btn-primary text-sm" onClick={requestVerification}>Request Verification Badge</button>
          </div>
        </article>
      </div>
    </section>
  );
}
