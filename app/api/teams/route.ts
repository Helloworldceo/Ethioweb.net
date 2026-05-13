import { NextRequest, NextResponse } from "next/server";

type Team = {
  slug: string;
  name: string;
  description: string;
  memberCount: number;
};

const teams = new Map<string, Team>([
  ["ethioweb-studio", { slug: "ethioweb-studio", name: "Ethioweb Studio", description: "Web platforms and digital identity", memberCount: 6 }],
  ["nile-product-lab", { slug: "nile-product-lab", name: "Nile Product Lab", description: "SaaS product design and growth", memberCount: 4 }],
]);

export async function GET() {
  return NextResponse.json({ items: Array.from(teams.values()) });
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as {
    slug?: string;
    name?: string;
    description?: string;
  };

  const slug = (payload.slug ?? "").trim().toLowerCase();
  const name = (payload.name ?? "").trim();
  const description = (payload.description ?? "").trim();

  if (!slug || !name) {
    return NextResponse.json({ error: "slug and name are required" }, { status: 400 });
  }

  if (teams.has(slug)) {
    return NextResponse.json({ error: "slug already exists" }, { status: 409 });
  }

  const item: Team = {
    slug,
    name,
    description,
    memberCount: 1,
  };
  teams.set(slug, item);

  return NextResponse.json({ ok: true, item });
}
