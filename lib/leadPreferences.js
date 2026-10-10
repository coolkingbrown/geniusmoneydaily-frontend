import { createLead } from "./leadsApi";

// Posts one of the three non-funnel lead forms — "contact", "opt_out", or
// "unsubscribe" — to the MoneyAid Ops leads API. `fields` must only contain
// the keys that `form` accepts per the API contract; the server builds
// survey_responses itself from the form type, so don't pass one.
export function recordLeadPreference(form, fields, honeypot = "") {
  return createLead(form, fields, honeypot);
}
