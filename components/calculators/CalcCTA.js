import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PRIMARY_CLASS_NAME =
  "w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-teal transition-all group";

const SECONDARY_CLASS_NAME =
  "w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-brand-navy font-extrabold text-sm px-8 py-3.5 rounded-xl border-2 border-brand-navy transition-all group";

export default function CalcCTA({ href, label, internal = false, variant = "primary" }) {
  const className = variant === "secondary" ? SECONDARY_CLASS_NAME : PRIMARY_CLASS_NAME;

  if (internal) {
    return (
      <Link href={href} className={className}>
        <span>{label}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener sponsored" className={className}>
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </a>
  );
}
