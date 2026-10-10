// Client for the MoneyAid Ops leads API, which all four GMD lead forms now
// post to instead of writing to Supabase directly. Contract:
// https://claude.ai/artifact/WUwTn8XktY8TBrwcHSA6iN
const LEADS_API_URL = "https://moneyaid-ops.vercel.app/api/public/leads";

export class LeadApiError extends Error {
  constructor(message, { status, code, issues } = {}) {
    super(message);
    this.name = "LeadApiError";
    this.status = status;
    this.code = code;
    this.issues = issues || [];
  }
}

async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function request(method, body) {
  let res;
  try {
    res = await fetch(LEADS_API_URL, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new LeadApiError("We couldn't reach the server. Check your connection and try again.", {
      code: "network_error",
    });
  }

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    const issues = data?.issues || [];
    const message =
      data?.message ||
      (issues.length ? issues.map((i) => i.problem).join(" ") : "Something went wrong. Please try again.");
    throw new LeadApiError(message, { status: res.status, code: data?.error, issues });
  }

  return data;
}

// Creates a lead for one of the four forms: "funnel", "contact", "opt_out",
// or "unsubscribe". `fields` must only contain the keys that form accepts
// per the API contract — the server refuses any other key, including
// id/org_id/created_at/survey_responses, which it sets itself.
export function createLead(form, fields, honeypot = "") {
  return request("POST", { form, ...fields, website: honeypot });
}

// Merges one or more survey answers into a funnel lead. Requires the
// per-lead token returned by createLead's "funnel" response — signed,
// bound to that lead_id, valid for 2 hours, and only usable for this.
export function updateLeadSurvey(leadId, token, surveyResponses) {
  return request("PATCH", { lead_id: leadId, token, survey_responses: surveyResponses });
}
