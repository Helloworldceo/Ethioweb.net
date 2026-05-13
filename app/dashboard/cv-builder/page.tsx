"use client";

import { FormEvent, useState } from "react";

export default function CvBuilderPage() {
  const [form, setForm] = useState({
    fullName: "",
    role: "",
    location: "",
    summary: "",
    targetRole: "",
    skills: "",
    highlights: "",
  });
  const [cv, setCv] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function generate(event: FormEvent) {
    event.preventDefault();
    setError(null);

    const response = await fetch("/api/cv/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        highlights: form.highlights.split("\n").map((s) => s.trim()).filter(Boolean),
      }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: "Failed to generate CV" }))) as {
        error?: string;
      };
      setError(payload.error ?? "Failed to generate CV");
      return;
    }

    const payload = (await response.json()) as { cv: string };
    setCv(payload.cv);
  }

  return (
    <section className="container-wrap py-12">
      <h1 className="heading-display text-4xl font-black">AI-style CV Builder</h1>
      <p className="mt-2 text-[var(--muted)]">Generate a polished CV draft in seconds from your profile inputs.</p>

      <form onSubmit={generate} className="mt-6 grid gap-3 md:grid-cols-2">
        <input className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3" placeholder="Full name" value={form.fullName} onChange={(e) => setForm((v) => ({ ...v, fullName: e.target.value }))} />
        <input className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3" placeholder="Role" value={form.role} onChange={(e) => setForm((v) => ({ ...v, role: e.target.value }))} />
        <input className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3" placeholder="Location" value={form.location} onChange={(e) => setForm((v) => ({ ...v, location: e.target.value }))} />
        <input className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3" placeholder="Target role" value={form.targetRole} onChange={(e) => setForm((v) => ({ ...v, targetRole: e.target.value }))} />
        <textarea className="md:col-span-2 h-24 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3" placeholder="Professional summary" value={form.summary} onChange={(e) => setForm((v) => ({ ...v, summary: e.target.value }))} />
        <input className="md:col-span-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3" placeholder="Skills (comma-separated)" value={form.skills} onChange={(e) => setForm((v) => ({ ...v, skills: e.target.value }))} />
        <textarea className="md:col-span-2 h-28 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3" placeholder="Highlights (one per line)" value={form.highlights} onChange={(e) => setForm((v) => ({ ...v, highlights: e.target.value }))} />
        <button type="submit" className="btn-primary w-fit">Generate CV</button>
      </form>

      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      {cv && (
        <article className="card mt-6 p-5">
          <p className="text-sm font-semibold">Generated CV draft</p>
          <pre className="mt-3 whitespace-pre-wrap text-sm text-[var(--muted)]">{cv}</pre>
        </article>
      )}
    </section>
  );
}
