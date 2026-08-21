import Link from "next/link";
import { ShieldCheck, Lock, ArrowUpRight } from "lucide-react";
import LogoIcon from "@/components/LogoIcon";

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Data Policy", href: "/data-policy" },
  { label: "Accessible Notice", href: "/accessibility" },
  { label: "Do Not Sell or Share My Personal Information", href: "/ccpa" },
  { label: "Privacy Notice", href: "/privacy-notice" },
  { label: "Unsubscribe", href: "/unsubscribe" },
];

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
              <LogoIcon variant="inverted" size={36} className="rounded-lg shadow-md" />
              <div className="flex items-center">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  GeniusMoney
                </span>
                <span className="font-extrabold text-xl tracking-tight text-brand-teal">
                  Daily
                </span>
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
            <h4 className="text-xs font-extrabold text-brand-teal uppercase tracking-wider">
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
              <li>
                <Link href="/category/lifestyle" className="hover:text-white transition-colors">
                  Lifestyle & Wellness
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Tools & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-brand-teal uppercase tracking-wider">
              Tools & Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 font-medium">
              <li>
                <Link href="/signup" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Get Your Free Offers</span>
                  <ArrowUpRight className="w-3 h-3 text-brand-teal" />
                </Link>
              </li>
              <li>
                <Link href="/#calculators?tab=personal-loan" className="hover:text-white transition-colors">
                  Personal Loan Calculator
                </Link>
              </li>
              <li>
                <Link href="/#calculators?tab=card-payoff" className="hover:text-white transition-colors">
                  Credit Card Payoff Calculator
                </Link>
              </li>
              <li>
                <Link href="/#calculators?tab=home-upgrades" className="hover:text-white transition-colors">
                  Home Upgrade & Solar Estimator
                </Link>
              </li>
              <li>
                <Link href="/#calculators?tab=auto-insurance" className="hover:text-white transition-colors">
                  Auto Insurance Savings Estimator
                </Link>
              </li>
              <li>
                <Link href="/#calculators?tab=life-insurance" className="hover:text-white transition-colors">
                  Life Insurance Needs Calculator
                </Link>
              </li>
              <li>
                <Link href="/#calculators?tab=mortgage" className="hover:text-white transition-colors">
                  Mortgage & Refinance Calculator
                </Link>
              </li>
              <li>
                <Link href="/#calculators?tab=debt-consolidation" className="hover:text-white transition-colors">
                  Debt Consolidation Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Corporate & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-brand-teal uppercase tracking-wider">
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
            GeniusMoneyDaily is an independent publisher and comparison service. The information provided across our articles, calculators, and rate tables is for informational and educational purposes only and does not constitute financial, investment, legal, or tax advice. 
          </p>
          <p className="font-semibold text-brand-teal">
            Disclaimer: Not affiliated with any state or federal government agency.
          </p>
        </div>

        {/* Bottom Bar (Copyright & Legal) */}
        <div className="flex flex-col items-center text-center text-xs text-slate-500 pt-4 gap-3">
          <p>Copyright © {currentYear} GeniusMoneyDaily</p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 max-w-4xl">
            {LEGAL_LINKS.map((link, index) => (
              <span key={link.href} className="flex items-center gap-2">
                <Link href={link.href} className="hover:text-slate-300 transition-colors whitespace-nowrap">
                  {link.label}
                </Link>
                {index < LEGAL_LINKS.length - 1 && <span className="text-slate-600">|</span>}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
