"use client";

import { useState } from "react";
import { Copy, MessageCircle, Share2 } from "lucide-react";

type ShareActionsProps = {
  profileUrl: string;
  title: string;
};

export function ShareActions({ profileUrl, title }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4">
      <p className="text-sm font-semibold">Share this profile</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title} ${profileUrl}`)}`}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary inline-flex items-center gap-2 text-sm"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary inline-flex items-center gap-2 text-sm"
        >
          <Share2 className="h-4 w-4" /> LinkedIn
        </a>
        <button onClick={copyLink} type="button" className="btn-secondary inline-flex items-center gap-2 text-sm">
          <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
