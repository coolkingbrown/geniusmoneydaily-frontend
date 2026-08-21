"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X, Sparkles } from "lucide-react";
import CoRegFunnel from "@/components/CoRegFunnel";

// Each entry in an article's offer_links array is expected to look like:
// {
//   id, brand_name, logo_url, cta_text, offer_url,
//   zone: "inline" | "sidebar" | "footer-cta" | "sticky-bar",
//   placement: "redirect" | "coreg-modal",  // default "redirect"
//   category: "loans" | "auto" | "life"     // optional; overrides the
//                                            // matching SafeBet default
//                                            // inside CoRegFunnel's survey
// }
export default function OfferCTA({ offers = [], zone }) {
  const [activeOffer, setActiveOffer] = useState(null);

  const zoneOffers = (Array.isArray(offers) ? offers : []).filter((o) => o.zone === zone);

  const handleCtaClick = (offer) => {
    if (offer.placement === "coreg-modal") {
      setActiveOffer(offer);
      return;
    }
    if (offer.offer_url) {
      window.open(offer.offer_url, "_blank", "noopener,noreferrer");
    }
  };

  if (zoneOffers.length === 0) return null;

  return (
    <>
      {zone === "inline" && (
        <div className="space-y-5 my-8">
          {zoneOffers.map((offer) => (
            <div
              key={offer.id || offer.brand_name}
              className="bg-brand-teal-light border border-brand-teal/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4"
            >
              {offer.logo_url && (
                <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-inner">
                  <Image src={offer.logo_url} alt={offer.brand_name || "Offer"} fill className="object-cover" />
                </div>
              )}
              <div className="flex-1 text-center sm:text-left space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" /> Sponsored Offer
                </span>
                <h4 className="font-extrabold text-slate-900 text-base">{offer.brand_name}</h4>
              </div>
              <button
                type="button"
                onClick={() => handleCtaClick(offer)}
                className="flex-shrink-0 bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 group"
              >
                <span>{offer.cta_text || "View Offer"}</span>
                <ArrowRight className="w-4 h-4 text-brand-teal group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      )}

      {zone === "sidebar" && (
        <div className="hidden lg:block sticky top-24 space-y-4">
          {zoneOffers.map((offer) => (
            <div
              key={offer.id || offer.brand_name}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 text-center"
            >
              {offer.logo_url && (
                <div className="relative h-20 w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
                  <Image src={offer.logo_url} alt={offer.brand_name || "Offer"} fill className="object-cover" />
                </div>
              )}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest bg-brand-navy text-brand-teal px-2 py-0.5 rounded">
                  Partner Offer
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm">{offer.brand_name}</h4>
              </div>
              <button
                type="button"
                onClick={() => handleCtaClick(offer)}
                className="w-full bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold text-sm py-3 rounded-xl shadow-teal transition-all flex items-center justify-center gap-1.5"
              >
                <span>{offer.cta_text || "Get Offer"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {zone === "footer-cta" && (
        <div className="space-y-6 mt-10">
          {zoneOffers.map((offer) => (
            <div
              key={offer.id || offer.brand_name}
              className="bg-brand-navy text-white rounded-2xl p-6 sm:p-8 border border-brand-navy-light space-y-4"
            >
              <span className="text-xs font-black text-brand-teal uppercase tracking-widest">Next Step for Readers</span>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight">{offer.brand_name}</h3>
              {offer.cta_text && <p className="text-sm text-slate-300">{offer.cta_text}</p>}
              <div>
                <button
                  type="button"
                  onClick={() => handleCtaClick(offer)}
                  className="inline-flex items-center justify-center bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold px-6 py-3 rounded-xl transition-all text-sm gap-2 group"
                >
                  <span>Claim This Offer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {zone === "sticky-bar" && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-brand-navy border-t border-brand-navy-light shadow-2xl">
          {zoneOffers.slice(0, 1).map((offer) => (
            <div key={offer.id || offer.brand_name} className="flex items-center justify-between gap-3 px-4 py-3 max-w-7xl mx-auto">
              <div className="min-w-0">
                <p className="text-white text-xs font-bold truncate">{offer.brand_name}</p>
                <p className="text-slate-400 text-[10px] truncate">{offer.cta_text || "Exclusive limited-time offer"}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCtaClick(offer)}
                className="flex-shrink-0 bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-extrabold px-4 py-2.5 rounded-lg flex items-center gap-1"
              >
                <span>Claim</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeOffer && (
        <div className="fixed inset-0 z-[60] bg-brand-navy-dark/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg my-8">
            <button
              type="button"
              onClick={() => setActiveOffer(null)}
              aria-label="Close"
              className="absolute -top-3 -right-3 z-10 bg-white text-brand-navy rounded-full p-2 shadow-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <CoRegFunnel offerLinks={offers} />
          </div>
        </div>
      )}
    </>
  );
}
