import { NextRequest, NextResponse } from "next/server";

type DomainItem = {
  profileId: string;
  domain: string;
  status: "pending" | "verified";
};

const domains = new Map<string, DomainItem>();

function isValidDomain(value: string) {
  return /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(value);
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as {
    profileId?: string;
    domain?: string;
  };

  const profileId = (payload.profileId ?? "").trim();
  const domain = (payload.domain ?? "").trim().toLowerCase();

  if (!profileId || !domain) {
    return NextResponse.json({ error: "profileId and domain are required" }, { status: 400 });
  }

  if (!isValidDomain(domain)) {
    return NextResponse.json({ error: "Invalid domain format" }, { status: 400 });
  }

  const item: DomainItem = { profileId, domain, status: "pending" };
  domains.set(`${profileId}:${domain}`, item);

  return NextResponse.json({ ok: true, item });
}

export async function GET(request: NextRequest) {
  const profileId = request.nextUrl.searchParams.get("profileId") ?? "";
  const items = Array.from(domains.values()).filter((item) => (profileId ? item.profileId === profileId : true));

  return NextResponse.json({ items });
}
