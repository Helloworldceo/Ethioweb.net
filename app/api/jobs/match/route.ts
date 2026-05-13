import { NextRequest, NextResponse } from "next/server";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
};

const jobs: Job[] = [
  { id: "job-1", title: "Frontend Engineer", company: "Addis Product Studio", location: "Addis Ababa", tags: ["react", "next.js", "tailwind"] },
  { id: "job-2", title: "Product Designer", company: "Nile Venture", location: "Remote", tags: ["ui", "ux", "figma"] },
  { id: "job-3", title: "Full-Stack Developer", company: "Habesha Systems", location: "Addis Ababa", tags: ["node", "react", "postgres"] },
  { id: "job-4", title: "IT Consultant", company: "Blue Ridge Consulting", location: "Hybrid", tags: ["consulting", "architecture", "cloud"] },
];

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as { skills?: string[] };
  const skills = (payload.skills ?? []).map((s) => s.toLowerCase().trim()).filter(Boolean);

  const items = jobs
    .map((job) => {
      const overlap = job.tags.filter((tag) => skills.includes(tag.toLowerCase())).length;
      const score = job.tags.length ? Math.round((overlap / job.tags.length) * 100) : 0;
      return { ...job, score };
    })
    .sort((a, b) => b.score - a.score);

  return NextResponse.json({ items });
}
