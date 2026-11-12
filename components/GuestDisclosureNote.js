// Replaces ArticleDisclaimer's disclaimerNote text on guest articles —
// always this exact legal text, never article.disclaimer_note. Sits last
// in the end-of-article sequence (item 5 of the guest-article spec).
//
// The compensation line is deliberately never shown right now — there is
// no paid_placement column on guest_authors yet, and per Randy's explicit
// instruction we do not infer it from cta presence or offer_links. `isPaid`
// is kept as a prop (rather than deleted) so wiring the real field in later
// is a one-line change at the call site; don't pass anything truthy here
// until MoneyAid Ops adds that column and confirms its name.
export default function GuestDisclosureNote({ isPaid = false }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
      <p className="text-xs text-slate-500 leading-relaxed">
        The views and opinions expressed in this article are those of the author and do not necessarily reflect
        those of GeniusMoneyDaily. This content is for general informational purposes only and is not tax, legal
        or financial advice. Consult a qualified professional about your situation.
      </p>
      {isPaid && (
        <p className="text-xs text-slate-500 leading-relaxed">
          GeniusMoneyDaily may receive compensation from links in this article.
        </p>
      )}
    </div>
  );
}
