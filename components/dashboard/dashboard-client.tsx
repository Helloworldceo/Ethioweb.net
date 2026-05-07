"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, FileText, FolderKanban, Link2, UploadCloud } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";

type ProfileRow = {
  id: string;
  username: string;
  full_name: string;
  role: string | null;
  location: string | null;
  bio: string | null;
  visibility: "public" | "private";
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
};

export function DashboardClient({ initialProfile, initialAssets }: DashboardClientProps) {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<ProfileRow | null>(initialProfile);
  const [assets, setAssets] = useState<AssetRow[]>(initialAssets);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    role: "",
    location: "",
    bio: "",
    visibility: "public" as "public" | "private",
  });

  const [uploadKind, setUploadKind] = useState("cv");
  const [uploadPublic, setUploadPublic] = useState(true);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

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

  const groupedAssets = {
    cv: assets.filter((item) => item.asset_kind === "cv"),
    portfolio: assets.filter((item) => item.asset_kind === "portfolio"),
    certificate: assets.filter((item) => item.asset_kind === "certificate"),
    business_card: assets.filter((item) => item.asset_kind === "business_card"),
  };

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
        <article className="card p-6 md:col-span-2">
          <h2 className="heading-display text-2xl font-bold">{t("Profile Basics", "የፕሮፋይል መረጃ")}</h2>
          <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={saveProfile}>
            <input
              className="rounded-xl border border-[var(--line)] bg-white p-3"
              value={form.fullName}
              onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
              placeholder="Full name"
              required
            />
            <input
              className="rounded-xl border border-[var(--line)] bg-white p-3"
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
              className="rounded-xl border border-[var(--line)] bg-white p-3"
              value={form.role}
              onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
              placeholder="Role"
            />
            <input
              className="rounded-xl border border-[var(--line)] bg-white p-3"
              value={form.location}
              onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
              placeholder="Location"
            />
            <select
              className="rounded-xl border border-[var(--line)] bg-white p-3"
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
              className="md:col-span-2 h-24 rounded-xl border border-[var(--line)] bg-white p-3"
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
            <UploadCloud className="h-4 w-4 text-[var(--brand)]" />
            <h3 className="heading-display text-xl font-bold">{t("Upload Files", "ፋይሎች ማስገባት")}</h3>
          </div>

          <form className="mt-4 space-y-3" onSubmit={uploadAsset}>
            <select
              className="w-full rounded-xl border border-[var(--line)] bg-white p-3"
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
              className="w-full rounded-xl border border-[var(--line)] bg-white p-3"
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
      </div>
    </section>
  );
}
