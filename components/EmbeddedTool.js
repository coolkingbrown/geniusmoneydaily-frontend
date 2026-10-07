import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getToolConfig } from "@/lib/toolsConfig";
import { parseToolParams } from "@/lib/toolParams";

export default function EmbeddedTool({ slug, rawParams }) {
  const tool = getToolConfig(slug);
  if (!tool) return null; // Unknown slug: render nothing, no broken UI.

  const initialValues = parseToolParams(tool, rawParams);
  const ToolComponent = tool.Component;

  return (
    <div className="my-8 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-brand-teal/15 px-2.5 py-1 rounded-full">
          Interactive Calculator
        </span>
        <Link
          href={`/tools/${slug}`}
          className="inline-flex items-center gap-1 text-xs font-extrabold text-brand-navy hover:text-brand-teal transition-colors whitespace-nowrap"
        >
          <span>Open Full Tool</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <ToolComponent initialValues={initialValues} />
    </div>
  );
}
