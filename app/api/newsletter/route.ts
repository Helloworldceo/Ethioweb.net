import { NextRequest, NextResponse } from "next/server";

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

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again soon." }, { status: 429 });
  }

  const payload = (await request.json().catch(() => ({}))) as {
    email?: string;
    website?: string;
  };

  if ((payload.website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = (payload.email ?? "").trim();
  if (!email || !isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (webhook) {
    const forwarded = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: "ethioweb-newsletter",
        subscribedAt: new Date().toISOString(),
      }),
    });

    if (!forwarded.ok) {
      return NextResponse.json({ error: "Could not subscribe right now." }, { status: 502 });
    }
  } else {
    console.info("[newsletter] subscribe", { email });
  }

  return NextResponse.json({ ok: true });
}
