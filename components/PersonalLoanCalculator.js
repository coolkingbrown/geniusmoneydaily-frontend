"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/calculators/CalcInput";
import CalcResult from "@/components/calculators/CalcResult";
import CalcCTA from "@/components/calculators/CalcCTA";
import { calcMonthlyPayment, formatCurrency } from "@/lib/calculators";

export default function PersonalLoanCalculator() {
  const [amount, setAmount] = useState(15000);
  const [apr, setApr] = useState(11.5);
  const [termMonths, setTermMonths] = useState(48);

  const { monthlyPayment, totalCost, totalInterest } = useMemo(() => {
    const payment = calcMonthlyPayment(amount, apr, termMonths);
    const cost = payment * termMonths;
    return {
      monthlyPayment: payment,
      totalCost: cost,
      totalInterest: cost - (Number(amount) || 0),
    };
  }, [amount, apr, termMonths]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-black text-brand-navy">Personal Loan Payment Calculator</h3>
        <p className="text-sm text-slate-500">Estimate your monthly payment on a fixed-rate personal loan.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalcInput label="Loan Amount" prefix="$" value={amount} onChange={setAmount} step={500} />
        <CalcInput label="APR" suffix="%" value={apr} onChange={setApr} step={0.1} />
        <CalcInput label="Term" suffix="mo" value={termMonths} onChange={setTermMonths} step={1} min={1} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalcResult label="Monthly Payment" value={formatCurrency(monthlyPayment, 2)} emphasis />
        <CalcResult label="Total Interest" value={formatCurrency(totalInterest)} />
        <CalcResult label="Total Cost" value={formatCurrency(totalCost)} />
      </div>

      <CalcCTA href="https://safebetloans.com/" label="See Pre-Qualified Loan Offers →" />
    </div>
  );
}
