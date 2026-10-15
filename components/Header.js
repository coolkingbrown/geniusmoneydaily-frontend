"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, TrendingUp, Menu, X, ShieldCheck, ChevronRight, ChevronDown } from "lucide-react";
import LogoIcon from "@/components/LogoIcon";

// No hardcoded numeric rates here — only a neutral "not available yet"
// shape, used if the server-rendered `rates` prop is ever missing. The
// ticker shows "—" instead of a number whenever source !== "fred" rather
// than ever displaying a fabricated-looking rate.
const UNAVAILABLE_RATES = { fedRate: null, mortgage30y: null, fedRateAsOf: null, mortgage30yAsOf: null, source: "unavailable" };

function formatRate(value, source) {
  return source === "fred" && typeof value === "number" ? `${value.toFixed(2)}%` : "—";
}

function formatAsOfDate(dateStr) {
  if (!dateStr) return null;
  try {
    return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export default function Header({ rates: initialRates }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  // Seeded from the server-rendered value (see app/layout.js) so the
  // initial HTML already shows live data — what crawlers, link previews,
  // and slow/no-JS connections see — instead of a placeholder that only
  // gets replaced after hydration.
  const [rates, setRates] = useState(initialRates || UNAVAILABLE_RATES);
  const [lifestyleDropdownOpen, setLifestyleDropdownOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Keeps the ticker fresh during a long-lived tab session without
    // requiring a full page reload; the layout's own hourly revalidate
    // already means this will usually just confirm the same values.
    async function loadRates() {
      try {
        const res = await fetch("/api/fred-rates");
        if (!res.ok) throw new Error(`Rates request failed: ${res.status}`);
        const data = await res.json();

        if (!cancelled) {
          setRates({
            fedRate: typeof data.fedRate === "number" ? data.fedRate : null,
            mortgage30y: typeof data.mortgage30y === "number" ? data.mortgage30y : null,
            fedRateAsOf: data.fedRateAsOf || null,
            mortgage30yAsOf: data.mortgage30yAsOf || null,
            source: data.source || "unavailable",
          });
        }
      } catch (err) {
        console.warn("Could not refresh live rates, keeping last known values:", err);
      }
    }

    loadRates();
    return () => {
      cancelled = true;
    };
  }, []);

  // Shared by the debounced effect below and the immediate Enter/submit
  // handler, so both paths run the exact same query logic.
  const runSearch = useCallback(async (trimmed) => {
    if (trimmed.length < 2) {
      setSearchResults([]);
      setSearchSubmitted(false);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error(`Search request failed: ${res.status}`);
      const data = await res.json();
      setSearchResults(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      console.warn("Search failed:", err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
      setSearchSubmitted(true);
    }
  }, []);

  // Debounced as the user types; triggers at 2+ characters.
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) {
      setSearchResults([]);
      setSearchSubmitted(false);
      return;
    }

    const timer = setTimeout(() => runSearch(trimmed), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, runSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    runSearch(searchQuery.trim());
  };

  // Show the more recent of the two observation dates, if either is available.
  const asOfLabel = formatAsOfDate(
    [rates.fedRateAsOf, rates.mortgage30yAsOf].filter(Boolean).sort().reverse()[0]
  );

  const navItems = [
    { name: "Loans", href: "/articles/category/loans" },
    { name: "Credit", href: "/articles/category/credit" },
    { name: "Savings", href: "/articles/category/savings" },
    { name: "Real Estate", href: "/articles/category/real-estate" },
    { name: "Taxes", href: "/articles/category/taxes" },
    {
      name: "Lifestyle",
      href: "/articles/category/lifestyle",
      subItems: [
        { name: "Fashion", href: "/articles/category/fashion" },
        { name: "Fitness & Wellness", href: "/articles/category/fitness-wellness" },
      ],
    },
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
            <span>Fed Rate: <strong className="text-white">{formatRate(rates.fedRate, rates.source)}</strong></span>
            <span>30Y Fixed Mortgage: <strong className="text-white">{formatRate(rates.mortgage30y, rates.source)}</strong></span>
            {asOfLabel && <span className="text-slate-400">As of {asOfLabel}</span>}
          </div>
          <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
            <Link href="/editorial-guidelines" className="flex items-center hover:text-white transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-brand-teal" /> Verified Financial Journalism
            </Link>
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
            {navItems.map((item) =>
              item.subItems ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setLifestyleDropdownOpen(true)}
                  onMouseLeave={() => setLifestyleDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="px-3.5 py-2 text-sm font-bold text-slate-700 hover:text-brand-navy hover:bg-slate-100 rounded-md transition-all duration-150 flex items-center gap-1"
                  >
                    {item.name}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Link>

                  {lifestyleDropdownOpen && (
                    <div className="absolute top-full left-0 pt-1 w-52 z-50">
                      <div className="bg-white border border-slate-200 rounded-lg shadow-lg py-1.5">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-brand-navy transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3.5 py-2 text-sm font-bold text-slate-700 hover:text-brand-navy hover:bg-slate-100 rounded-md transition-all duration-150"
                >
                  {item.name}
                </Link>
              )
            )}
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
          <div className="max-w-3xl mx-auto space-y-2">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
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
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1"
              >
                Close
              </button>
            </form>

            {searchQuery.trim().length >= 2 && (
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm max-h-80 overflow-y-auto divide-y divide-slate-100">
                {searchLoading ? (
                  <p className="px-4 py-3 text-sm text-slate-500">Searching...</p>
                ) : searchResults.length > 0 ? (
                  searchResults.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/articles/${article.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="block px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <p className="text-sm font-bold text-slate-900 leading-snug">{article.title}</p>
                      {article.excerpt && (
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-0.5">
                          {article.excerpt}
                        </p>
                      )}
                    </Link>
                  ))
                ) : searchSubmitted ? (
                  <p className="px-4 py-3 text-sm text-slate-500">
                    No articles found for &quot;{searchQuery.trim()}&quot;.
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-100 rounded-md"
              >
                {item.name}
              </Link>
              {item.subItems && (
                <div className="pl-4 space-y-1">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-md"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
