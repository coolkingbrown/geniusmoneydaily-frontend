"use client";

import { useState, useEffect, useCallback } from "react";
import { Landmark, CreditCard, Home, Car, HeartPulse, Calculator, PiggyBank } from "lucide-react";
import PersonalLoanCalculator from "@/components/PersonalLoanCalculator";
import CreditCardPayoffCalculator from "@/components/CreditCardPayoffCalculator";
import HomeUpgradeCalculator from "@/components/HomeUpgradeCalculator";
import AutoInsuranceCalculator from "@/components/AutoInsuranceCalculator";
import LifeInsuranceCalculator from "@/components/LifeInsuranceCalculator";
import MortgageCalculator from "@/components/MortgageCalculator";
import DebtCalculator from "@/components/DebtCalculator";

const TOOLS = [
  { id: "personal-loan", label: "Personal Loan", icon: Landmark, Component: PersonalLoanCalculator },
  { id: "card-payoff", label: "Card Payoff", icon: CreditCard, Component: CreditCardPayoffCalculator },
  { id: "home-upgrades", label: "Home Upgrades", icon: Home, Component: HomeUpgradeCalculator },
  { id: "auto-insurance", label: "Auto Insurance", icon: Car, Component: AutoInsuranceCalculator },
  { id: "life-insurance", label: "Life Insurance", icon: HeartPulse, Component: LifeInsuranceCalculator },
  { id: "mortgage", label: "Mortgage & Refi", icon: Calculator, Component: MortgageCalculator },
  { id: "debt-consolidation", label: "Debt Consolidation", icon: PiggyBank, Component: DebtCalculator },
];

const DEFAULT_TOOL_ID = TOOLS[0].id;
const VALID_IDS = new Set(TOOLS.map((tool) => tool.id));

// Footer deep-links use "/#calculators?tab=X" — the tab param lives inside
// the hash fragment (after the "?"), not the real query string, so
// useSearchParams (which reads location.search) can't see it. Parsing
// window.location.hash directly is the only way to read it.
function readTabFromHash() {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash; // e.g. "#calculators?tab=auto-insurance"
  const queryIndex = hash.indexOf("?");
  if (queryIndex === -1) return null;
  const tab = new URLSearchParams(hash.slice(queryIndex + 1)).get("tab");
  return VALID_IDS.has(tab) ? tab : null;
}

export default function ToolsSection() {
  const [activeId, setActiveId] = useState(DEFAULT_TOOL_ID);

  const applyTabFromHash = useCallback(() => {
    const tab = readTabFromHash();
    if (!tab) return;
    setActiveId(tab);
    // Defer to the next frame so the section has rendered before scrolling.
    requestAnimationFrame(() => {
      document.getElementById("calculators")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  useEffect(() => {
    applyTabFromHash();

    window.addEventListener("hashchange", applyTabFromHash);
    return () => window.removeEventListener("hashchange", applyTabFromHash);
  }, [applyTabFromHash]);

  const active = TOOLS.find((tool) => tool.id === activeId) || TOOLS[0];
  const ActiveComponent = active.Component;

  return (
    <section id="calculators" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-brand-teal/15 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            Free Financial Tools
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            7 Calculators to Plan Your Next Money Move
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Instant, no-obligation estimates across loans, insurance, home upgrades, and more.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = tool.id === activeId;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveId(tool.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive ? "bg-brand-navy text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tool.label}
              </button>
            );
          })}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10">
          <ActiveComponent />
        </div>
      </div>
    </section>
  );
}
