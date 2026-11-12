import { ChevronRight } from "lucide-react";

// Deliberately matches components/Header.js's "Get Your Free Offers" nav
// button class-for-class (navy bg, white uppercase text, single teal
// chevron, same padding/radius/shadow/hover) rather than either of
// CalcCTA's existing variants — this button is meant to look like site
// chrome, not like a typical offer CTA. Always external: it points at a
// guest_authors.link_url or a frame_disclosures cta's tracked /go/ link.
export default function GuestAuthorCTA({ href, label }) {
  if (!href || !label) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener sponsored"
      className="flex-shrink-0 bg-brand-navy hover:bg-brand-navy-light text-white text-xs uppercase tracking-wider font-bold px-4 py-2.5 rounded-lg border border-brand-navy shadow-sm transition-all hover:shadow flex items-center gap-1.5"
    >
      <span>{label}</span>
      <ChevronRight className="w-3.5 h-3.5 text-brand-teal" />
    </a>
  );
}
