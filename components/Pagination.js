import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, basePath }) {
  if (totalPages <= 1) return null;

  const pageHref = (p) => (p <= 1 ? basePath : `${basePath}?page=${p}`);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <Link
        href={pageHref(Math.max(1, currentPage - 1))}
        aria-disabled={isFirst}
        className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold border border-slate-200 bg-white transition-colors ${
          isFirst ? "pointer-events-none opacity-40" : "hover:bg-slate-100 text-slate-700"
        }`}
      >
        <ChevronLeft className="w-3.5 h-3.5" /> Prev
      </Link>

      <span className="text-xs font-bold text-slate-500 px-2">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={pageHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={isLast}
        className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold border border-slate-200 bg-white transition-colors ${
          isLast ? "pointer-events-none opacity-40" : "hover:bg-slate-100 text-slate-700"
        }`}
      >
        Next <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
