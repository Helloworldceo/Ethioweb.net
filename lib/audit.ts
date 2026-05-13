type AuditPayload = {
  action: string;
  actorId?: string;
  resource?: string;
  metadata?: Record<string, unknown>;
};

export async function writeAuditEvent(payload: AuditPayload) {
  const body = {
    ...payload,
    at: new Date().toISOString(),
  };

  const webhook = process.env.AUDIT_WEBHOOK_URL;
  if (!webhook) {
    console.info("[audit]", body);
    return;
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("[audit] failed", error);
  }
}
