import { supabase } from "./supabaseClient";

const AUTHOR_FIELDS_WITH_PAID_PLACEMENT =
  "id, name, author_type, image_url, summary, title_line, slug, link_url, paid_placement";
const AUTHOR_FIELDS_FALLBACK = "id, name, author_type, image_url, summary, title_line, slug, link_url";

// guest_authors.paid_placement is a real column per MoneyAid's contract,
// but its migration (20261127000000_guest_paid_placement.sql) may not be
// run yet on this environment — selecting a column that doesn't exist
// fails the whole query, not just that field. Try with it first; if that
// specific query errors, retry without it and default paid_placement to
// false, exactly as MoneyAid's contract specifies ("treat a missing
// column as false").
//
// `applyFilter` takes the partial query (after .select(...)) and returns
// the final awaited {data, error} — e.g. (q) => q.eq("id", id).maybeSingle().
async function fetchGuestAuthor(applyFilter) {
  const primary = await applyFilter(supabase.from("guest_authors").select(AUTHOR_FIELDS_WITH_PAID_PLACEMENT));
  if (!primary.error) {
    return primary.data || null;
  }

  console.warn("guest_authors.paid_placement not selectable yet, falling back:", primary.error);

  const fallback = await applyFilter(supabase.from("guest_authors").select(AUTHOR_FIELDS_FALLBACK));
  if (fallback.error) {
    console.error("Error fetching guest author:", fallback.error);
    return null;
  }

  return fallback.data ? { ...fallback.data, paid_placement: false } : null;
}

// Per MoneyAid's contract: the anon key can only read these columns, and
// only for ACTIVE authors (enforced by their RLS policy, not filtered here)
// — select=* is refused outright. An inactive/deactivated author simply
// won't come back from either query below; callers should treat a null
// result as "render the article without an author box," not an error.
export async function getGuestAuthorById(id) {
  if (!id) return null;
  return fetchGuestAuthor((query) => query.eq("id", id).maybeSingle());
}

export async function getGuestAuthorBySlug(slug) {
  return fetchGuestAuthor((query) => query.eq("slug", slug).maybeSingle());
}
