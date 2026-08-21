// Client-side helper for triggering transactional emails via /api/send-email.
// Intentionally fire-and-forget friendly: callers that don't want to block
// their UI on the network round-trip can call this without awaiting it.
export function sendTransactionalEmail(payload) {
  return fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error("Error sending transactional email:", err);
  });
}
