import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOOLS_CONFIG, TOOL_SLUGS } from "@/lib/toolsConfig";

export const metadata = {
  title: "Free Financial Calculators | GeniusMoneyDaily",
  description:
    "Eight free calculators for loans, credit cards, home upgrades, auto insurance, life insurance, mortgages, debt consolidation, and monthly budgeting — instant estimates, no sign-up required.",
  alternates: { canonical: "/tools" },
};

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-brand-navy-light shadow-lg">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="bg-brand-teal text-brand-navy text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider">
              Free Financial Tools
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              8 Calculators to Plan Your Next Money Move
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Instant, no-obligation estimates across loans, insurance, home upgrades, and more — each with its own
              detailed guide.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TOOL_SLUGS.map((slug) => {
            const tool = TOOLS_CONFIG[slug];
            return (
              <Link
                key={slug}
                href={`/tools/${slug}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-card-hover transition-all p-6 flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-brand-navy transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">{tool.dek}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-sm font-extrabold text-brand-navy group-hover:text-brand-teal transition-colors">
                  <span>Open Calculator</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
