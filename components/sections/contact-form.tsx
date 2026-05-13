"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        website,
      }),
    });

    setSubmitting(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: "Send failed" }))) as {
        error?: string;
      };
      setError(payload.error ?? "Send failed");
      return;
    }

    const payload = (await response.json().catch(() => ({}))) as {
      delivery?: string;
      mailtoUrl?: string;
    };

    if (payload.delivery === "mailto" && payload.mailtoUrl) {
      window.location.href = payload.mailtoUrl;
    }

    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
    setWebsite("");
  }

  if (sent) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-3">
        <p className="text-lg font-bold text-[var(--brand)]">Message sent successfully.</p>
        <p className="text-sm text-[var(--muted)]">Thanks for reaching out. We&apos;ll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-sm font-semibold text-[var(--brand)]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
      <label htmlFor="contact-name" className="sr-only">Your name</label>
      <input
        id="contact-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
        placeholder="Your name"
      />
      <label htmlFor="contact-email" className="sr-only">Email address</label>
      <input
        id="contact-email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        type="email"
        className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
        placeholder="Email address"
      />
      <label htmlFor="contact-message" className="sr-only">Tell us about your project</label>
      <textarea
        id="contact-message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
        className="h-32 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
        placeholder="Tell us about your project"
      />
      <input
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
