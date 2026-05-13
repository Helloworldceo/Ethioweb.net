"use client";

import { FormEvent, useState } from "react";

type DomainItem = {
  domain: string;
  status: "pending" | "verified";
};

export default function DomainSettingsPage() {
  const [domain, setDomain] = useState("");
  const [items, setItems] = useState<DomainItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function addDomain(event: FormEvent) {
    event.preventDefault();
    setError(null);

    const response = await fetch("/api/domains", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId: "current-user", domain }),
    });

    const payload = (await response.json().catch(() => ({}))) as { error?: string; item?: DomainItem };
    if (!response.ok) {
      setError(payload.error ?? "Unable to add domain");
      return;
    }

    const item = payload.item;
    if (item) {
      setItems((prev) => [item, ...prev]);
      setDomain("");
    }
  }

  return (
    <section className="container-wrap py-12">
      <h1 className="heading-display text-4xl font-black">Custom Domains</h1>
      <p className="mt-2 text-[var(--muted)]">Connect your own domain to your Ethioweb public profile.</p>

      <form onSubmit={addDomain} className="mt-5 flex flex-wrap gap-2">
        <input className="min-w-[240px] flex-1 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="profile.yourdomain.com" />
        <button className="btn-primary" type="submit">Add domain</button>
      </form>
      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}

      <div className="mt-5 grid gap-2">
        {items.map((item) => (
          <article key={item.domain} className="card flex items-center justify-between p-3 text-sm">
            <span>{item.domain}</span>
            <span className="chip">{item.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
