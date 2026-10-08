"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import CalcInput from "@/components/calculators/CalcInput";
import CalcResult from "@/components/calculators/CalcResult";
import CalcCTA from "@/components/calculators/CalcCTA";
import { formatCurrency } from "@/lib/calculators";

const MODES = [
  { id: "standard", label: "Standard Budget" },
  { id: "holiday", label: "Holiday Savings" },
  { id: "travel", label: "Trip Savings" },
];
const VALID_MODES = new Set(MODES.map((m) => m.id));

const CATEGORIES = [
  { key: "housing", label: "Housing" },
  { key: "transportation", label: "Transportation" },
  { key: "food", label: "Food" },
  { key: "utilities", label: "Utilities" },
  { key: "insurance", label: "Insurance" },
  { key: "debt", label: "Debt Payments" },
  { key: "entertainment", label: "Entertainment" },
  { key: "savings", label: "Savings" },
  { key: "other", label: "Other" },
];

const DEFAULT_CATEGORY_AMOUNTS = {
  housing: 1600,
  transportation: 450,
  food: 600,
  utilities: 250,
  insurance: 300,
  debt: 400,
  entertainment: 200,
  savings: 550,
  other: 200,
};

const GOAL_LABELS = {
  holiday: { goal: "Holiday Budget Goal", months: "Months Until Holiday", noun: "holiday" },
  travel: { goal: "Trip Budget Goal", months: "Months Until Trip", noun: "trip" },
};

const WEEKS_PER_MONTH = 52 / 12;

export default function BudgetCalculator({ initialValues = {} }) {
  const [income, setIncome] = useState(initialValues.income ?? 5500);
  const [categoryAmounts, setCategoryAmounts] = useState(() => {
    const amounts = { ...DEFAULT_CATEGORY_AMOUNTS };
    for (const { key } of CATEGORIES) {
      if (initialValues[key] !== undefined) amounts[key] = initialValues[key];
    }
    return amounts;
  });
  const [mode, setMode] = useState(VALID_MODES.has(initialValues.mode) ? initialValues.mode : "standard");
  const [goalAmount, setGoalAmount] = useState(initialValues.goalAmount ?? 1200);
  const [goalMonths, setGoalMonths] = useState(initialValues.goalMonths ?? 4);
  const [emergencyFlags, setEmergencyFlags] = useState({});

  const updateCategory = (key, value) => {
    setCategoryAmounts((prev) => ({ ...prev, [key]: value }));
  };

  const toggleEmergencyFlag = (key, checked) => {
    setEmergencyFlags((prev) => ({ ...prev, [key]: checked }));
  };

  const {
    totalCategoryExpenses,
    monthlyGoalSavings,
    totalExpenses,
    remaining,
    emergencyTotal,
    isShortfall,
    cumulativeShortfall,
    loanAmount,
    weeklyGoalTarget,
    reducedGoalAmount,
  } = useMemo(() => {
    const totalCategoryExpenses = CATEGORIES.reduce(
      (sum, c) => sum + (Number(categoryAmounts[c.key]) || 0),
      0
    );
    const monthlyGoalSavings = mode !== "standard" && goalMonths > 0 ? goalAmount / goalMonths : 0;
    const totalExpenses = totalCategoryExpenses + monthlyGoalSavings;
    const remaining = (Number(income) || 0) - totalExpenses;

    const emergencyTotal = CATEGORIES.reduce(
      (sum, c) => sum + (emergencyFlags[c.key] ? Number(categoryAmounts[c.key]) || 0 : 0),
      0
    );

    const isShortfall = remaining < 0;
    const cumulativeShortfall =
      isShortfall && mode !== "standard" && goalMonths > 0 ? Math.abs(remaining) * goalMonths : 0;
    const loanAmount = Math.round(cumulativeShortfall);

    const weeklyGoalTarget = mode !== "standard" && goalMonths > 0 ? goalAmount / (goalMonths * WEEKS_PER_MONTH) : 0;
    const reducedGoalAmount = Math.max(0, goalAmount - cumulativeShortfall);

    return {
      totalCategoryExpenses,
      monthlyGoalSavings,
      totalExpenses,
      remaining,
      emergencyTotal,
      isShortfall,
      cumulativeShortfall,
      loanAmount,
      weeklyGoalTarget,
      reducedGoalAmount,
    };
  }, [categoryAmounts, mode, goalAmount, goalMonths, income, emergencyFlags]);

  const goalLabels = GOAL_LABELS[mode];
  const showGapPanel = mode !== "standard" && isShortfall;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-black text-brand-navy">Monthly Budget Calculator</h3>
        <p className="text-sm text-slate-500">See exactly where your money goes — and what's left over.</p>
      </div>

      <div className="flex gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === m.id ? "bg-brand-navy text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <CalcInput label="Monthly Income (Take-Home)" prefix="$" value={income} onChange={setIncome} step={50} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {CATEGORIES.map((c) => (
          <div key={c.key} className="space-y-1.5">
            <CalcInput
              label={c.label}
              prefix="$"
              value={categoryAmounts[c.key]}
              onChange={(value) => updateCategory(c.key, value)}
              step={10}
            />
            {mode === "standard" && (
              <label className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                <input
                  type="checkbox"
                  checked={!!emergencyFlags[c.key]}
                  onChange={(e) => toggleEmergencyFlag(c.key, e.target.checked)}
                  className="accent-brand-teal"
                />
                Emergency / one-time this month
              </label>
            )}
          </div>
        ))}
      </div>

      {mode !== "standard" && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalcInput label={goalLabels.goal} prefix="$" value={goalAmount} onChange={setGoalAmount} step={50} />
          <CalcInput label={goalLabels.months} suffix="mo" value={goalMonths} onChange={setGoalMonths} step={1} min={1} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalcResult label="Total Monthly Expenses" value={formatCurrency(totalExpenses)} emphasis />
        {mode !== "standard" && (
          <CalcResult label="Monthly Savings Needed" value={formatCurrency(monthlyGoalSavings)} />
        )}
        <div className={`rounded-xl p-4 ${remaining < 0 ? "bg-red-50 border border-red-200" : "bg-slate-50 border border-slate-200"}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${remaining < 0 ? "text-red-600" : "text-slate-400"}`}>
            {remaining < 0 ? "Budget Shortfall" : "Remaining After Expenses"}
          </p>
          <p className={`text-xl font-black ${remaining < 0 ? "text-red-700" : "text-brand-navy"}`}>
            {formatCurrency(Math.abs(remaining))}
          </p>
        </div>
      </div>

      <p className="text-[11px] text-slate-400">
        Total Monthly Expenses is {formatCurrency(totalCategoryExpenses)} in categories
        {mode !== "standard" ? ` plus ${formatCurrency(monthlyGoalSavings)} in goal savings` : ""}. Estimates only —
        actual spending varies month to month.
      </p>

      {showGapPanel && (
        <div className="space-y-4">
          <p className="text-sm font-bold text-slate-700">
            This plan doesn't fit your current monthly budget. Here are two ways to handle that:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-extrabold text-brand-navy">Close the Gap</h4>
              <ul className="text-sm text-slate-600 space-y-2.5 list-disc list-inside">
                <li>
                  Trim about {formatCurrency(cumulativeShortfall)} from the total goal (about{" "}
                  {formatCurrency(Math.abs(remaining))} less per month) — that would bring your {goalLabels.noun}{" "}
                  budget down to about {formatCurrency(reducedGoalAmount)}.
                </li>
                <li>
                  Breaking the {formatCurrency(goalAmount)} goal into a weekly target comes to about{" "}
                  {formatCurrency(weeklyGoalTarget)}/week instead of {formatCurrency(monthlyGoalSavings)}/month — the
                  total is the same, but a smaller, more frequent target can be easier to hit.
                </li>
                <li>
                  Look for lower-cost alternatives —{" "}
                  {mode === "holiday" ? "a shorter gift list or shared/handmade gifts" : "flexible travel dates, a shorter trip, or a less expensive destination"} —
                  before considering a loan.
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-extrabold text-brand-navy">Cover It With a Personal Loan</h4>
              <p className="text-sm text-slate-600">
                A personal loan could cover the {formatCurrency(loanAmount)} gap in your budget over the next{" "}
                {goalMonths} months, without cutting your plans. This isn't a loan offer or an approval — rates and
                terms are shown once you compare real options.
              </p>

              <CalcCTA
                href={`/tools/personal-loan-calculator?amount=${loanAmount}`}
                label="Compare Personal Loan Options →"
                internal
              />
            </div>
          </div>
        </div>
      )}

      {mode === "standard" && emergencyTotal > 0 && (
        <p className="text-sm text-slate-500">
          You flagged {formatCurrency(emergencyTotal)} in emergency or one-time expenses this month.{" "}
          <Link
            href={`/tools/personal-loan-calculator?amount=${Math.round(emergencyTotal)}`}
            className="text-brand-teal font-semibold hover:underline"
          >
            See how a personal loan could help spread out that cost →
          </Link>
        </p>
      )}
    </div>
  );
}
