"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/calculators/CalcInput";
import CalcResult from "@/components/calculators/CalcResult";
import CalcCTA from "@/components/calculators/CalcCTA";
import { formatCurrency } from "@/lib/calculators";

const PROJECT_TABS = [
  { id: "roofing", label: "Roofing" },
  { id: "windows", label: "Windows" },
  { id: "solar", label: "Solar" },
];

// Rough industry-average heuristics for a quick estimate — not a quote.
const COST_PER_SQFT_ROOFING = 8.5;
const ROOFING_EQUITY_RECOUP_RATE = 0.6;
const ANNUAL_SAVINGS_PER_WINDOW = 40;
const SOLAR_OFFSET_RATE = 0.9;
const SOLAR_SYSTEM_COST_MULTIPLIER = 5; // x annual power bill
const FEDERAL_SOLAR_TAX_CREDIT_RATE = 0.3;

export default function HomeUpgradeCalculator() {
  const [activeTab, setActiveTab] = useState("roofing");

  const [sqFootage, setSqFootage] = useState(2000);
  const [roofAge, setRoofAge] = useState(15);

  const [windowCount, setWindowCount] = useState(12);

  const [monthlyBill, setMonthlyBill] = useState(180);

  const roofing = useMemo(() => {
    const cost = sqFootage * COST_PER_SQFT_ROOFING;
    const equityAdded = cost * ROOFING_EQUITY_RECOUP_RATE;
    return { cost, equityAdded, netInvestment: cost - equityAdded };
  }, [sqFootage]);

  const windows = useMemo(() => ({ annualSavings: windowCount * ANNUAL_SAVINGS_PER_WINDOW }), [windowCount]);

  const solar = useMemo(() => {
    const twentyYearSavings = monthlyBill * 12 * 20 * SOLAR_OFFSET_RATE;
    const systemCostEstimate = monthlyBill * 12 * SOLAR_SYSTEM_COST_MULTIPLIER;
    const taxCredit = systemCostEstimate * FEDERAL_SOLAR_TAX_CREDIT_RATE;
    return { twentyYearSavings, taxCredit };
  }, [monthlyBill]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-black text-brand-navy">Home Upgrade & Energy Savings Estimator</h3>
        <p className="text-sm text-slate-500">Ballpark cost and savings for common home improvement projects.</p>
      </div>

      <div className="flex gap-2">
        {PROJECT_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id ? "bg-brand-navy text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "roofing" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcInput label="Sq Footage" suffix="sqft" value={sqFootage} onChange={setSqFootage} step={100} />
            <CalcInput label="Roof Age" suffix="yrs" value={roofAge} onChange={setRoofAge} step={1} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResult label="Estimated Cost" value={formatCurrency(roofing.cost)} emphasis />
            <CalcResult label="Est. Equity Added" value={formatCurrency(roofing.equityAdded)} />
            <CalcResult label="Net Investment" value={formatCurrency(roofing.netInvestment)} />
          </div>
        </div>
      )}

      {activeTab === "windows" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcInput label="Window Count" value={windowCount} onChange={setWindowCount} step={1} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResult label="Est. Annual HVAC Savings" value={formatCurrency(windows.annualSavings)} emphasis />
          </div>
        </div>
      )}

      {activeTab === "solar" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalcInput label="Monthly Power Bill" prefix="$" value={monthlyBill} onChange={setMonthlyBill} step={10} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResult label="Est. 20-Yr Savings" value={formatCurrency(solar.twentyYearSavings)} emphasis />
            <CalcResult label="Federal Tax Credit Value" value={formatCurrency(solar.taxCredit)} />
          </div>
        </div>
      )}

      <p className="text-[11px] text-slate-400">
        Estimates are for illustrative purposes only and vary by region, materials, and installer.
      </p>

      <CalcCTA href="https://www.homeadvisor.com/" label="Compare Local Contractor Rates & Incentives →" />
    </div>
  );
}
