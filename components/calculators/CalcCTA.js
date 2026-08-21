import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CLASS_NAME =
  "w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-teal transition-all group";

export default function CalcCTA({ href, label, internal = false }) {
  if (internal) {
    return (
      <Link href={href} className={CLASS_NAME}>
        <span>{label}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={CLASS_NAME}>
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </a>
  );
}
