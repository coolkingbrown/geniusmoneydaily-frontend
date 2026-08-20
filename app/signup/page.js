import Link from "next/link";
import CoRegFunnel from "@/components/CoRegFunnel";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-brand-navy gap-1">
            ← Back to GeniusMoneyDaily
          </Link>
        </div>

        <CoRegFunnel />
      </div>
    </div>
  );
}
