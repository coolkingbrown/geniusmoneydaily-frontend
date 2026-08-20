import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Award, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-brand-navy text-white relative overflow-hidden py-16 md:py-20 border-b border-brand-navy-light">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-blue-600/10 rounded-full filter blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-navy-light border border-brand-teal/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-teal tracking-wide shadow-sm">
            <Zap className="w-3.5 h-3.5 text-brand-teal" />
            <span>DAILY PROGRAMMATIC FINANCIAL INTELLIGENCE</span>
          </div>

          {/* Main Large White Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Smart Financial Insights, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-emerald-300 to-white">
              Delivered Daily.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Data-backed mortgage strategies, high-yield rate updates, tax optimization, and credit hacks curated for modern wealth building.
          </p>

          {/* Prominent CTA Button (White text, #00D29F background) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-teal hover-glow transition-all duration-200 gap-2 border border-brand-teal/20 group"
            >
              <span>Get Your Free Offers</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Key Authority Indicators */}
          <div className="pt-8 border-t border-brand-navy-light/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0" />
              <span>Independent Rate Benchmarks</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Shield className="w-4 h-4 text-brand-teal flex-shrink-0" />
              <span>Zero Sponsored Bias</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Award className="w-4 h-4 text-brand-teal flex-shrink-0" />
              <span>Vetted Financial Authors</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0" />
              <span>100% Free Daily Briefing</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
