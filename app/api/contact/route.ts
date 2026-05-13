import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { writeAuditEvent } from "@/lib/audit";

type RateEntry = {
  count: number;
  resetAt: number;
};

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;
const ipBucket = new Map<string, RateEntry>();

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return "unknown";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = ipBucket.get(ip);

  if (!current || current.resetAt <= now) {
    ipBucket.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT) {
    return true;
  }

  current.count += 1;
  ipBucket.set(ip, current);
  return false;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  const payload = (await request.json().catch(() => ({}))) as {
    name?: string;
    email?: string;
    message?: string;
    website?: string;
  };

  // Hidden field for bots; treat as success to avoid signaling anti-spam logic.
  if ((payload.website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!name || name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
  }

  if (!isEmail(email) || email.length > 120) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!message || message.length < 10 || message.length > 4000) {
    return NextResponse.json(
      { error: "Message should be between 10 and 4000 characters." },
      { status: 400 },
    );
  }

  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "helloworldceo@1gmail.com";
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || "Ethioweb <noreply@ethioweb.net>";

  if (resendKey) {
    const resend = new Resend(resendKey);
    const result = await resend.emails.send({
      from,
      to: [recipient],
      replyTo: email,
      subject: `New Ethioweb contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (result.error) {
      return NextResponse.json(
        { error: "Unable to send right now. Please try again shortly." },
        { status: 502 },
      );
    }
  } else if (webhook) {
    const forwarded = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: `New Ethioweb contact from ${name}`,
        to: recipient,
        from: email,
        name,
        message,
        source: "ethioweb-contact-form",
      }),
    });

    if (!forwarded.ok) {
      return NextResponse.json(
        { error: "Unable to send right now. Please try again shortly." },
        { status: 502 },
      );
    }
  } else {
    const subject = encodeURIComponent(`New Ethioweb contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    await writeAuditEvent({
      action: "contact.mailto_fallback",
      resource: "contact-form",
      metadata: { name, email },
    });

    return NextResponse.json({ ok: true, delivery: "mailto", mailtoUrl });
  }

  await writeAuditEvent({
    action: "contact.submit",
    resource: "contact-form",
    metadata: { name, email },
  });

  return NextResponse.json({ ok: true, delivery: "provider" });
}