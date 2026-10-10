"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const OFFERS_API_URL = "https://moneyaid-ops.vercel.app/api/public/offers?site=gmd";

export default function OfferCarousel() {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadOffers() {
      try {
        const res = await fetch(OFFERS_API_URL);
        const data = await res.json();
        if (!cancelled && res.ok && data?.success && Array.isArray(data.offers)) {
          setOffers(data.offers);
        }
      } catch (err) {
        console.warn("Could not fetch offers from MoneyAid Ops:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOffers();
    return () => {
      cancelled = true;
    };
  }, []);

  // Never show an empty box: nothing while loading, and nothing at all if
  // the route returned no offers or errored.
  if (loading) return null;
  if (offers.length === 0) return null;

  const isCompleted = currentIndex >= offers.length;

  if (isCompleted) {
    return (
      <div className="text-center space-y-6 py-8 animate-fade-in">
        <div className="w-16 h-16 bg-brand-teal/20 text-brand-teal rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-[#00D29F]" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-brand-navy">
            You're all set! Check your inbox for your customized financial updates.
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Your personalized rate briefing and selected offer details are on their way.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold px-8 py-3.5 rounded-xl shadow-md transition-colors text-sm gap-2"
          >
            <span>Return to News Hub</span>
            <ArrowRight className="w-4 h-4 text-brand-teal" />
          </Link>
        </div>
      </div>
    );
  }

  const currentOffer = offers[currentIndex];

  const handleYes = () => setCurrentIndex((prev) => prev + 1);
  const handleNo = () => setCurrentIndex((prev) => prev + 1);

  return (
    <div className="space-y-6 py-4 animate-fade-in">
      {/* Progress Pill Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="inline-flex items-center gap-1.5 bg-brand-teal/10 text-[#00D29F] px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#00D29F]" /> Exclusive Offer {currentIndex + 1} of {offers.length}
        </div>
        <span className="text-xs font-semibold text-slate-400">GeniusMoneyDaily Partner</span>
      </div>

      {/* Offer Display Card — text-only when there's no image_url, which the
          offers API always sends as null today. */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4 shadow-sm">
        {currentOffer.image_url && (
          <div className="relative h-28 w-full max-w-xs mx-auto rounded-xl overflow-hidden bg-white border border-slate-200 shadow-inner flex items-center justify-center p-2">
            <img
              src={currentOffer.image_url}
              alt={currentOffer.name || "Financial Offer"}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}

        <div className="space-y-1">
          {currentOffer.category && (
            <span className="text-[10px] font-black uppercase tracking-widest bg-brand-navy text-brand-teal px-2.5 py-0.5 rounded">
              {currentOffer.category}
            </span>
          )}
          <h3 className="text-xl font-black text-slate-900 leading-tight pt-1">{currentOffer.name}</h3>
          {currentOffer.description && (
            <p className="text-xs text-slate-500 font-medium">{currentOffer.description}</p>
          )}
        </div>
      </div>

      {/* Yes opens the tracked offer link directly; No just advances. */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <a
          href={currentOffer.url}
          target="_blank"
          rel="noopener sponsored"
          onClick={handleYes}
          className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold py-4 px-6 rounded-xl shadow-md transition-all border border-brand-navy-light flex items-center justify-center gap-2 group text-base"
        >
          <span>Yes</span>
          <CheckCircle2 className="w-5 h-5 text-brand-teal group-hover:scale-110 transition-transform" />
        </a>

        <button
          type="button"
          onClick={handleNo}
          className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold py-4 px-6 rounded-xl shadow-md transition-all border border-brand-navy-light flex items-center justify-center gap-2 text-base text-slate-200 hover:text-white"
        >
          <span>No</span>
        </button>
      </div>

      <p className="text-[11px] text-slate-400 text-center">
        Clicking "Yes" opens the offer securely in a new window.
      </p>
    </div>
  );
}
