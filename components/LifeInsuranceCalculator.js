"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/calculators/CalcInput";
import CalcResult from "@/components/calculators/CalcResult";
import CalcCTA from "@/components/calculators/CalcCTA";
import { formatCurrency } from "@/lib/calculators";

const INCOME_REPLACEMENT_MULTIPLIER = 10;
const PER_DEPENDENT_BUFFER = 100000;

export default function LifeInsuranceCalculator() {
  const [income, setIncome] = useState(75000);
  const [debt, setDebt] = useState(250000);
  const [dependents, setDependents] = useState(2);

  const recommendedCoverage = useMemo(() => {
    const incomeVal = Number(income) || 0;
    const debtVal = Number(debt) || 0;
    const dependentsVal = Number(dependents) || 0;
    return incomeVal * INCOME_REPLACEMENT_MULTIPLIER + debtVal + dependentsVal * PER_DEPENDENT_BUFFER;
  }, [income, debt, dependents]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-black text-brand-navy">Life Insurance Needs Calculator</h3>
        <p className="text-sm text-slate-500">A quick rule-of-thumb estimate for how much coverage to consider.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalcInput label="Annual Income" prefix="$" value={income} onChange={setIncome} step={1000} />
        <CalcInput label="Mortgage / Debt" prefix="$" value={debt} onChange={setDebt} step={1000} />
        <CalcInput label="Dependents" value={dependents} onChange={setDependents} step={1} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalcResult label="Recommended Coverage" value={formatCurrency(recommendedCoverage)} emphasis />
      </div>

      <p className="text-[11px] text-slate-400">
        Based on 10x annual income plus outstanding debt and $100,000 per dependent — a common starting rule of
        thumb, not personalized advice.
      </p>

      <CalcCTA href="http://safebetlife.com/" label="Calculate Life Insurance Rates →" />
    </div>
  );
}
