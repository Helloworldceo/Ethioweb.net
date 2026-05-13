import { NextRequest, NextResponse } from "next/server";

function bulletize(values: string[]) {
  return values.filter(Boolean).map((v) => `- ${v}`).join("\n");
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as {
    fullName?: string;
    role?: string;
    location?: string;
    summary?: string;
    skills?: string[];
    highlights?: string[];
    targetRole?: string;
  };

  const fullName = (payload.fullName ?? "").trim();
  const role = (payload.role ?? "").trim();
  const location = (payload.location ?? "").trim();
  const summary = (payload.summary ?? "").trim();
  const targetRole = (payload.targetRole ?? role ?? "Professional").trim();
  const skills = Array.isArray(payload.skills) ? payload.skills.map((s) => s.trim()).filter(Boolean) : [];
  const highlights = Array.isArray(payload.highlights) ? payload.highlights.map((s) => s.trim()).filter(Boolean) : [];

  if (!fullName || !summary) {
    return NextResponse.json({ error: "fullName and summary are required" }, { status: 400 });
  }

  const cv = `# ${fullName}\n\n${role || "Professional"}${location ? ` | ${location}` : ""}\n\n## Professional Summary\n${summary}\n\n## Target Role\n${targetRole}\n\n## Core Skills\n${skills.length ? bulletize(skills) : "- Add your skills here"}\n\n## Selected Highlights\n${highlights.length ? bulletize(highlights) : "- Add measurable achievements here"}\n\n## Public Profile\nhttps://ethioweb.net/u/${fullName.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 20)}\n`;

  return NextResponse.json({ ok: true, cv });
}
