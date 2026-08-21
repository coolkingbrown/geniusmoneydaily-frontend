"use client";

import { useState, useEffect, useMemo } from "react";
import CalcInput from "@/components/calculators/CalcInput";
import CalcResult from "@/components/calculators/CalcResult";
import CalcCTA from "@/components/calculators/CalcCTA";
import { calcMonthlyPayment, formatCurrency } from "@/lib/calculators";

const FALLBACK_LIVE_RATE = 6.42;

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [currentRate, setCurrentRate] = useState(7.25);
  const [termYears, setTermYears] = useState(30);
  const [liveRate, setLiveRate] = useState(FALLBACK_LIVE_RATE);
  const [rateLoading, setRateLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadRate() {
      try {
        const res = await fetch("/api/fred-rates");
        if (!res.ok) throw new Error(`Rates request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled && typeof data.mortgage30y === "number") {
          setLiveRate(data.mortgage30y);
        }
      } catch (err) {
        console.warn("Could not load live 30Y rate, using fallback:", err);
      } finally {
        if (!cancelled) setRateLoading(false);
      }
    }

    loadRate();
    return () => {
      cancelled = true;
    };
  }, []);

  const { monthlyPayment, monthlySavings, refiSavingsTotal } = useMemo(() => {
    const loanAmount = (Number(homePrice) || 0) * (1 - (Number(downPaymentPct) || 0) / 100);
    const termMonths = (Number(termYears) || 0) * 12;

    const paymentAtLiveRate = calcMonthlyPayment(loanAmount, liveRate, termMonths);
    const paymentAtCurrentRate = calcMonthlyPayment(loanAmount, currentRate, termMonths);
    const savings = paymentAtCurrentRate - paymentAtLiveRate;

    return {
      monthlyPayment: paymentAtLiveRate,
      monthlySavings: savings,
      refiSavingsTotal: savings * termMonths,
    };
  }, [homePrice, downPaymentPct, currentRate, termYears, liveRate]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-black text-brand-navy">Mortgage & Refinance Calculator</h3>
        <p className="text-sm text-slate-500">
          Using today's live 30-year rate:{" "}
          <span className="font-bold text-brand-navy">
            {rateLoading ? "loading..." : `${liveRate.toFixed(2)}%`}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CalcInput label="Home Price" prefix="$" value={homePrice} onChange={setHomePrice} step={5000} />
        <CalcInput label="Down Payment" suffix="%" value={downPaymentPct} onChange={setDownPaymentPct} step={1} />
        <CalcInput label="Your Current Rate" suffix="%" value={currentRate} onChange={setCurrentRate} step={0.1} />
        <CalcInput label="Term" suffix="yrs" value={termYears} onChange={setTermYears} step={5} min={1} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CalcResult label="Monthly Payment at Live Rate" value={formatCurrency(monthlyPayment, 2)} emphasis />
        {monthlySavings > 0 ? (
          <CalcResult label="Lifetime Refi Savings" value={formatCurrency(refiSavingsTotal)} />
        ) : (
          <CalcResult label="Lifetime Refi Savings" value="Your rate is already competitive" />
        )}
      </div>

      <CalcCTA href="/signup" label="Get Matched With a Refinance Lender →" internal />
    </div>
  );
}
