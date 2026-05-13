import { NextRequest, NextResponse } from "next/server";

type Message = {
  from: string;
  to: string;
  text: string;
  at: string;
};

const inMemoryMessages: Message[] = [];

export async function GET(request: NextRequest) {
  const user = request.nextUrl.searchParams.get("user") ?? "";
  const items = user
    ? inMemoryMessages.filter((message) => message.from === user || message.to === user)
    : inMemoryMessages;

  return NextResponse.json({ items: items.slice(-50).reverse() });
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as {
    from?: string;
    to?: string;
    text?: string;
  };

  const from = (payload.from ?? "").trim();
  const to = (payload.to ?? "").trim();
  const text = (payload.text ?? "").trim();

  if (!from || !to || !text) {
    return NextResponse.json({ error: "from, to, and text are required" }, { status: 400 });
  }

  const item: Message = {
    from,
    to,
    text,
    at: new Date().toISOString(),
  };
  inMemoryMessages.push(item);

  return NextResponse.json({ ok: true, item });
}
