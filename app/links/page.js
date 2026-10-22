import Image from "next/image";
import Link from "next/link";
import { getBioLinks } from "@/lib/bioLinks";
import { verticalLabel } from "@/lib/verticals";
import LogoIcon from "@/components/LogoIcon";

// Standalone bio-link landing page (Instagram/TikTok bio link). Rendered
// with no site chrome — see components/SiteChrome.js. Not meant to rank;
// noindex, still followable so link equity passes through to the articles.
export const metadata = {
  title: "GeniusMoneyDaily | Latest Links",
  description: "The latest stories from GeniusMoneyDaily.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/links" },
};

// Matches the top-level categories shown in the site's main nav
// (components/Header.js) exactly — the bio page is meant to feel like a
// natural extension of it, not a separate, bigger category list.
const CATEGORIES = [
  { name: "Loans", href: "/articles/category/loans" },
  { name: "Credit", href: "/articles/category/credit" },
  { name: "Debt Relief", href: "/articles/category/debt-relief" },
  { name: "Savings", href: "/articles/category/savings" },
  { name: "Real Estate", href: "/articles/category/real-estate" },
  { name: "Taxes", href: "/articles/category/taxes" },
  { name: "Lifestyle", href: "/articles/category/lifestyle" },
];

function LinkCard({ link }) {
  const formattedDate = link.date
    ? new Date(`${link.date}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : null;

  return (
    <a
      href={link.url}
      className="block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {link.image_url && (
        <div className="relative aspect-video w-full bg-slate-100">
          <Image src={link.image_url} alt={link.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 320px" />
        </div>
      )}
      <div className="p-4 space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          {link.category && (
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-brand-teal/15 px-2 py-0.5 rounded">
              {verticalLabel(link.category)}
            </span>
          )}
          {link.has_video && (
            <span className="text-[10px] font-bold text-brand-navy bg-slate-100 px-2 py-0.5 rounded">▶ Video</span>
          )}
        </div>
        <h2 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">{link.title}</h2>
        {formattedDate && <p className="text-[11px] text-slate-400">{formattedDate}</p>}
      </div>
    </a>
  );
}

export default async function BioLinksPage() {
  const links = (await getBioLinks()) || [];
  const cards = links.slice(0, 24);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto px-4 py-10 space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <LogoIcon variant="default" size={48} className="rounded-xl shadow-md" />
            <div className="flex items-center">
              <span className="font-extrabold text-xl tracking-tight text-brand-navy">GeniusMoney</span>
              <span className="font-extrabold text-xl tracking-tight text-brand-teal">Daily</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Lifestyle Fashion &amp; Finance
            </span>
          </Link>
        </div>

        {cards.length > 0 ? (
          <div className="space-y-4">
            {cards.map((link) => (
              <LinkCard key={link.url} link={link} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center space-y-3">
            <p className="text-sm text-slate-500">We're updating our latest stories right now.</p>
            <Link href="/articles" className="text-sm font-bold text-brand-teal hover:underline">
              Browse All Articles →
            </Link>
          </div>
        )}

        <div className="pt-4 border-t border-slate-200 space-y-3">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">
            Browse by Category
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
