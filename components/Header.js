"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, TrendingUp, Menu, X, ShieldCheck, ChevronRight } from "lucide-react";
import LogoIcon from "@/components/LogoIcon";

const FALLBACK_RATES = { fedRate: 5.25, mortgage30y: 6.42 };

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rates, setRates] = useState(FALLBACK_RATES);

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      try {
        const res = await fetch("/api/rates");
        if (!res.ok) throw new Error(`Rates request failed: ${res.status}`);
        const data = await res.json();

        if (!cancelled) {
          setRates({
            fedRate: typeof data.fedRate === "number" ? data.fedRate : FALLBACK_RATES.fedRate,
            mortgage30y: typeof data.mortgage30y === "number" ? data.mortgage30y : FALLBACK_RATES.mortgage30y,
          });
        }
      } catch (err) {
        console.warn("Could not load live rates, using fallback values:", err);
      }
    }

    loadRates();
    return () => {
      cancelled = true;
    };
  }, []);

  const navItems = [
    { name: "Loans", href: "/category/loans" },
    { name: "Credit", href: "/category/credit" },
    { name: "Savings", href: "/category/savings" },
    { name: "Real Estate", href: "/category/real-estate" },
    { name: "Taxes", href: "/category/taxes" },
    { name: "Lifestyle", href: "/category/lifestyle" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Financial Market Ticker Top Bar */}
      <div className="bg-brand-navy text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6 text-[11px] font-medium">
            <span className="flex items-center text-brand-teal font-semibold">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> DAILY FINANCIAL PULSE
            </span>
            <span>Fed Rate: <strong className="text-white">{rates.fedRate.toFixed(2)}%</strong></span>
            <span>30Y Fixed Mortgage: <strong className="text-white">{rates.mortgage30y.toFixed(2)}%</strong></span>
            <span>Avg High-Yield APY: <strong className="text-brand-teal font-bold">5.15%</strong></span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
            <span className="flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-brand-teal" /> Verified Financial Journalism
            </span>
            <span>Updated Daily</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left-Aligned Logo (Without .com) */}
          <Link href="/" className="flex items-center gap-3 group">
            <LogoIcon variant="default" size={40} className="rounded-lg shadow-md" />
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-extrabold text-2xl tracking-tight text-brand-navy">
                  GeniusMoney
                </span>
                <span className="font-extrabold text-2xl tracking-tight text-brand-teal">
                  Daily
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                Lifestyle Fashion & Finance
              </span>
            </div>
          </Link>

          {/* Right-Aligned Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3.5 py-2 text-sm font-bold text-slate-700 hover:text-brand-navy hover:bg-slate-100 rounded-md transition-all duration-150"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Header Action Controls (Search & CTA) */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-600 hover:text-brand-navy hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/signup"
              className="bg-brand-navy hover:bg-brand-navy-light text-white text-xs uppercase tracking-wider font-bold px-4 py-2.5 rounded-lg border border-brand-navy shadow-sm transition-all hover:shadow flex items-center gap-1.5"
            >
              <span>Get Your Free Offers</span>
              <ChevronRight className="w-3.5 h-3.5 text-brand-teal" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-600 hover:text-brand-navy rounded-md"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-brand-navy hover:bg-slate-100 rounded-md focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Search Overlay Drawer */}
      {searchOpen && (
        <div className="bg-slate-100 border-t border-b border-slate-200 py-3 px-4 transition-all">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search mortgage rates, credit cards, high-yield savings, tax tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-100 rounded-md"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-200">
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-brand-navy text-white text-center font-bold px-4 py-3 rounded-lg block"
            >
              Get Your Free Offers
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
