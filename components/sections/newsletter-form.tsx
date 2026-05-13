"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, website }),
    });

    setLoading(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: "Subscribe failed" }))) as {
        error?: string;
      };
      setError(payload.error ?? "Subscribe failed");
      return;
    }

    setMessage("Subscribed. You will receive our next growth brief.");
    setEmail("");
    setWebsite("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      {message && <p className="text-xs text-emerald-300">{message}</p>}
      {error && <p className="text-xs text-rose-300">{error}</p>}
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="min-w-[180px] flex-1 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]"
        />
        <button type="submit" disabled={loading} className="btn-secondary text-sm">
          {loading ? "Joining..." : "Join newsletter"}
        </button>
      </div>
      <input
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
    </form>
  );
}
