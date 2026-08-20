"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const DEFAULT_OFFERS = [
  {
    id: "off-1",
    brand_name: "SoFi High-Yield Banking",
    logo_url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=400&auto=format&fit=crop",
    redirect_url: "https://www.sofi.com/banking/",
    category: "High-Yield Savings & APY",
  },
  {
    id: "off-2",
    brand_name: "Capital One Venture X Rewards",
    logo_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop",
    redirect_url: "https://www.capitalone.com/credit-cards/venture-x/",
    category: "0% APR & Cash Back Credit",
  },
  {
    id: "off-3",
    brand_name: "Rocket Mortgage Refinance",
    logo_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop",
    redirect_url: "https://www.rocketmortgage.com/",
    category: "Mortgage & Debt Consolidation",
  },
  {
    id: "off-4",
    brand_name: "TurboTax Premier Tax Optimizer",
    logo_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop",
    redirect_url: "https://turbotax.intuit.com/",
    category: "High-Earner Tax Shielding",
  },
];

export default function OfferCarousel() {
  const [offers, setOffers] = useState(DEFAULT_OFFERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        const { data, error } = await supabase
          .from("offers")
          .select("id, brand_name, logo_url, redirect_url, category")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setOffers(data);
        }
      } catch (err) {
        console.warn("Could not fetch offers from Supabase, using defaults:", err);
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  const handleYes = () => {
    const currentOffer = offers[currentIndex];
    if (currentOffer?.redirect_url) {
      window.open(currentOffer.redirect_url, "_blank");
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleNo = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="text-center py-12 space-y-3">
        <div className="w-8 h-8 border-4 border-brand-teal border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading Exclusive Offers...</p>
      </div>
    );
  }

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

  return (
    <div className="space-y-6 py-4 animate-fade-in">
      {/* Progress Pill Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="inline-flex items-center gap-1.5 bg-brand-teal/10 text-[#00D29F] px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#00D29F]" /> Exclusive Offer {currentIndex + 1} of {offers.length}
        </div>
        <span className="text-xs font-semibold text-slate-400">GeniusMoneyDaily Partner</span>
      </div>

      {/* Offer Display Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4 shadow-sm">
        {currentOffer.logo_url && (
          <div className="relative h-28 w-full max-w-xs mx-auto rounded-xl overflow-hidden bg-white border border-slate-200 shadow-inner flex items-center justify-center p-2">
            <Image
              src={currentOffer.logo_url}
              alt={currentOffer.brand_name || "Financial Offer"}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest bg-brand-navy text-brand-teal px-2.5 py-0.5 rounded">
            {currentOffer.category || "Financial Partner"}
          </span>
          <h3 className="text-xl font-black text-slate-900 leading-tight pt-1">
            {currentOffer.brand_name}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Would you like to explore this pre-qualified rate & bonus offer?
          </p>
        </div>
      </div>

      {/* Yes / No Horizontal Buttons (Dark Navy background for both) */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <button
          type="button"
          onClick={handleYes}
          className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold py-4 px-6 rounded-xl shadow-md transition-all border border-brand-navy-light flex items-center justify-center gap-2 group text-base"
        >
          <span>Yes</span>
          <CheckCircle2 className="w-5 h-5 text-brand-teal group-hover:scale-110 transition-transform" />
        </button>

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
