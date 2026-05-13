import { NextRequest, NextResponse } from "next/server";
import { writeAuditEvent } from "@/lib/audit";

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as {
    kind?: string;
    message?: string;
    source?: string;
    line?: number;
    col?: number;
    reason?: string;
  };

  await writeAuditEvent({
    action: "client.error",
    resource: "frontend",
    metadata: {
      kind: payload.kind,
      message: payload.message,
      source: payload.source,
      line: payload.line,
      col: payload.col,
      reason: payload.reason,
    },
  });

  return NextResponse.json({ ok: true });
}
