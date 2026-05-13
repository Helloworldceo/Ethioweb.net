"use client";

import { FormEvent, useState } from "react";

type Message = {
  from: string;
  to: string;
  text: string;
  at: string;
};

export default function MessagesPage() {
  const [to, setTo] = useState("dawitb");
  const [text, setText] = useState("");
  const [items, setItems] = useState<Message[]>([]);

  async function send(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: "current-user", to, text }),
    });

    if (!response.ok) return;
    setText("");

    const getRes = await fetch("/api/messages?user=current-user");
    const payload = (await getRes.json()) as { items: Message[] };
    setItems(payload.items ?? []);
  }

  return (
    <section className="container-wrap py-12">
      <h1 className="heading-display text-4xl font-black">Messaging</h1>
      <p className="mt-2 text-[var(--muted)]">Direct messaging between users (MVP inbox).</p>

      <form onSubmit={send} className="mt-5 grid gap-2 md:max-w-xl">
        <input className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Recipient username" />
        <textarea className="h-24 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your message" />
        <button className="btn-primary w-fit" type="submit">Send</button>
      </form>

      <div className="mt-6 grid gap-2">
        {items.map((item, index) => (
          <article key={`${item.at}-${index}`} className="card p-3 text-sm">
            <p className="font-semibold">To @{item.to}</p>
            <p className="mt-1 text-[var(--muted)]">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
