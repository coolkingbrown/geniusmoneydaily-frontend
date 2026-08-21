import { supabase } from "./supabaseClient";

// Records a compliance preference (opt-out, unsubscribe, etc.) as its own
// leads row rather than searching for and merging into an existing one —
// this keeps an immutable audit trail of the request and avoids depending
// on anon SELECT access to `leads` (insert-only RLS is enough).
//
// `surveyResponses` is merged into the leads.survey_responses jsonb column
// as-is (e.g. { ccpa_opt_out: true, opt_out_timestamp: "..." }).
// `fields` are additional top-level lead columns (first_name, phone, etc).
export async function recordLeadPreference(email, surveyResponses, fields = {}) {
  const { error } = await supabase.from("leads").insert([
    {
      id: crypto.randomUUID(),
      email,
      ...fields,
      survey_responses: surveyResponses,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Error recording lead preference:", error, surveyResponses);
    throw error;
  }
}
