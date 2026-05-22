"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, website }),
    });

    setLoading(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: "Subscription failed." }))) as {
        error?: string;
      };
      setError(payload.error ?? "Subscription failed.");
      return;
    }

    setSuccess(true);
    setEmail("");
    setWebsite("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      {success ? (
        <p className="text-sm font-medium text-[#9fe3c8]">✓ Subscription confirmed</p>
      ) : (
        <>
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
              className="min-w-[180px] flex-1 rounded-lg border border-[#29456f] bg-[#173156] px-3 py-2 text-sm text-white placeholder:text-[#9ab3d9]"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#f3b25f] px-4 py-2 text-sm font-medium text-[#102343] transition-colors hover:bg-[#f0bf7d] disabled:opacity-50"
            >
              {loading ? "Joining..." : "Subscribe"}
            </button>
          </div>
        </>
      )}
      {error && <p className="mt-2 text-sm text-[#ffb3b3]">{error}</p>}
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
