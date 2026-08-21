import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalPageShell({ title, updatedLabel = "Last Updated: August 2026", children }) {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-brand-teal" /> Back to GeniusMoneyDaily
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 lg:p-12 space-y-6">
          <div className="space-y-2 pb-6 border-b border-slate-100">
            <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">{title}</h1>
            {updatedLabel && (
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{updatedLabel}</p>
            )}
          </div>

          <div className="space-y-5 text-sm sm:text-base text-slate-600 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
