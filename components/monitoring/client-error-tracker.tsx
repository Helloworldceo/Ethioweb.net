"use client";

import { useEffect } from "react";

function postClientError(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/errors", blob);
    return;
  }

  fetch("/api/errors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Ignore telemetry transport failures.
  });
}

export function ClientErrorTracker() {
  useEffect(() => {
    function onError(event: ErrorEvent) {
      postClientError({
        kind: "error",
        message: event.message,
        source: event.filename,
        line: event.lineno,
        col: event.colno,
      });
    }

    function onUnhandled(event: PromiseRejectionEvent) {
      postClientError({
        kind: "unhandledrejection",
        reason: String(event.reason),
      });
    }

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandled);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandled);
    };
  }, []);

  return null;
}
