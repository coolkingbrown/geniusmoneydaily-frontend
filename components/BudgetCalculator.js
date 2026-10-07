"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import CalcInput from "@/components/calculators/CalcInput";
import CalcResult from "@/components/calculators/CalcResult";
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
  holiday: { goal: "Holiday Budget Goal", months: "Months Until Holiday" },
  travel: { goal: "Trip Budget Goal", months: "Months Until Trip" },
};

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

  const updateCategory = (key, value) => {
    setCategoryAmounts((prev) => ({ ...prev, [key]: value }));
  };

  const { totalCategoryExpenses, monthlyGoalSavings, totalExpenses, remaining } = useMemo(() => {
    const totalCategoryExpenses = CATEGORIES.reduce(
      (sum, c) => sum + (Number(categoryAmounts[c.key]) || 0),
      0
    );
    const monthlyGoalSavings = mode !== "standard" && goalMonths > 0 ? goalAmount / goalMonths : 0;
    const totalExpenses = totalCategoryExpenses + monthlyGoalSavings;
    const remaining = (Number(income) || 0) - totalExpenses;
    return { totalCategoryExpenses, monthlyGoalSavings, totalExpenses, remaining };
  }, [categoryAmounts, mode, goalAmount, goalMonths, income]);

  const goalLabels = GOAL_LABELS[mode];

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
          <CalcInput
            key={c.key}
            label={c.label}
            prefix="$"
            value={categoryAmounts[c.key]}
            onChange={(value) => updateCategory(c.key, value)}
            step={10}
          />
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

      <p className="text-sm text-slate-500">
        Carrying high-interest debt that's eating into your budget?{" "}
        <Link href="/tools/personal-loan-calculator" className="text-brand-teal font-semibold hover:underline">
          See how a personal loan could simplify your payments →
        </Link>
      </p>
    </div>
  );
}
