"use client";

import { FormEvent, useState } from "react";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  score: number;
};

export default function JobsPage() {
  const [skills, setSkills] = useState("react,next.js,tailwind");
  const [jobs, setJobs] = useState<Job[]>([]);

  async function matchJobs(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/jobs/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: skills.split(",").map((s) => s.trim()).filter(Boolean) }),
    });
    const payload = (await response.json()) as { items: Job[] };
    setJobs(payload.items ?? []);
  }

  return (
    <section className="container-wrap py-12">
      <h1 className="heading-display text-4xl font-black">Job Matching</h1>
      <p className="mt-2 text-[var(--muted)]">Match your skill set with relevant opportunities.</p>

      <form onSubmit={matchJobs} className="mt-5 flex flex-wrap gap-2">
        <input className="min-w-[250px] flex-1 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills comma-separated" />
        <button className="btn-primary" type="submit">Find Matches</button>
      </form>

      <div className="mt-6 grid gap-3">
        {jobs.map((job) => (
          <article key={job.id} className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="heading-display text-xl font-bold">{job.title} · {job.company}</h2>
              <span className="chip">{job.score}% match</span>
            </div>
            <p className="mt-1 text-sm text-[var(--muted)]">{job.location} · {job.tags.join(", ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
