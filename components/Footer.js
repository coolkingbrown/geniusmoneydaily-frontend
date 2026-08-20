import Link from "next/link";
import { ShieldCheck, Lock, ExternalLink, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-12 border-t border-brand-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-brand-navy-light">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center text-brand-navy font-black text-xl shadow-md">
                G
              </div>
              <div className="flex items-center">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  GeniusMoney
                </span>
                <span className="font-extrabold text-xl tracking-tight text-brand-teal">
                  Daily
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-0.5">.com</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              GeniusMoneyDaily is an independent digital financial publication delivering programmatic SEO news, market intelligence, mortgage rate updates, and personal wealth frameworks.
            </p>
            <div className="flex items-center space-x-3 text-xs text-brand-teal font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-brand-teal" /> Editorial Integrity
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-brand-teal" /> Independent Data
              </span>
            </div>
          </div>

          {/* Navigation Column 1: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider text-brand-teal">
              Financial Hubs
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 font-medium">
              <li>
                <Link href="/category/loans" className="hover:text-white transition-colors">
                  Loans & Refinancing
                </Link>
              </li>
              <li>
                <Link href="/category/credit" className="hover:text-white transition-colors">
                  Credit Cards & FICO
                </Link>
              </li>
              <li>
                <Link href="/category/savings" className="hover:text-white transition-colors">
                  High-Yield Savings
                </Link>
              </li>
              <li>
                <Link href="/category/real-estate" className="hover:text-white transition-colors">
                  Real Estate & Mortgages
                </Link>
              </li>
              <li>
                <Link href="/category/taxes" className="hover:text-white transition-colors">
                  Tax Planning & Wealth
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Tools & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider text-brand-teal">
              Tools & Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 font-medium">
              <li>
                <Link href="/signup" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Free Financial Plan</span>
                  <ArrowUpRight className="w-3 h-3 text-brand-teal" />
                </Link>
              </li>
              <li>
                <Link href="/category/loans" className="hover:text-white transition-colors">
                  Mortgage Rate Calculator
                </Link>
              </li>
              <li>
                <Link href="/category/credit" className="hover:text-white transition-colors">
                  Balance Transfer Finder
                </Link>
              </li>
              <li>
                <Link href="/category/savings" className="hover:text-white transition-colors">
                  APY Comparison Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Corporate & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider text-brand-teal">
              Legal & Info
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 font-medium">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/editorial" className="hover:text-white transition-colors">
                  Editorial Guidelines
                </Link>
              </li>
              <li>
                <Link href="/disclosures" className="hover:text-white transition-colors">
                  Advertiser Disclosure
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Editorial Team
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Required Disclaimer Banner */}
        <div className="bg-brand-navy-dark p-6 rounded-xl border border-brand-navy-light text-xs text-slate-400 space-y-3">
          <p className="font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-teal" /> Regulatory Disclaimer & Transparency Statement
          </p>
          <p className="leading-relaxed">
            GeniusMoneyDaily.com is an independent publisher and comparison service. The information provided across our articles, calculators, and rate tables is for informational and educational purposes only and does not constitute financial, investment, legal, or tax advice. 
          </p>
          <p className="font-semibold text-brand-teal">
            Disclaimer: Not affiliated with any state or federal government agency.
          </p>
        </div>

        {/* Bottom Bar (Copyright & Legal) */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-4 gap-4">
          <p>© {currentYear} GeniusMoneyDaily.com. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <Link href="/disclosures" className="hover:text-slate-300 transition-colors">
              Disclosures
            </Link>
            <Link href="/sitemap" className="hover:text-slate-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
