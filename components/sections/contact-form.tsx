"use client";

import { FormEvent, useRef, useState } from "react";

export function ContactForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    const msg = msgRef.current?.value.trim() ?? "";
    if (!name || !email || !msg) return;

    const subject = encodeURIComponent(`Ethioweb enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    window.location.href = `mailto:helloworldceo@1gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-3">
        <p className="text-lg font-bold text-[var(--brand)]">Your mail client should open shortly.</p>
        <p className="text-sm text-[var(--muted)]">If it didn&apos;t, email us directly at helloworldceo@1gmail.com</p>
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
      <input
        ref={nameRef}
        required
        className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
        placeholder="Your name"
      />
      <input
        ref={emailRef}
        required
        type="email"
        className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
        placeholder="Email address"
      />
      <textarea
        ref={msgRef}
        required
        className="h-32 w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
        placeholder="Tell us about your project"
      />
      <button type="submit" className="btn-primary">
        Send message
      </button>
    </form>
  );
}
