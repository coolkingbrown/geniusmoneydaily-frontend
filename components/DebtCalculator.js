"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/calculators/CalcInput";
import CalcResult from "@/components/calculators/CalcResult";
import CalcCTA from "@/components/calculators/CalcCTA";
import { calcMonthlyPayment, formatCurrency } from "@/lib/calculators";

export default function DebtCalculator() {
  const [totalDebt, setTotalDebt] = useState(20000);
  const [cardApr, setCardApr] = useState(24.99);
  const [loanApr, setLoanApr] = useState(13.99);
  const [termMonths, setTermMonths] = useState(48);

  const { cardInterest, loanInterest, savings } = useMemo(() => {
    const cardPayment = calcMonthlyPayment(totalDebt, cardApr, termMonths);
    const loanPayment = calcMonthlyPayment(totalDebt, loanApr, termMonths);
    const debtVal = Number(totalDebt) || 0;

    const cardInt = cardPayment * termMonths - debtVal;
    const loanInt = loanPayment * termMonths - debtVal;

    return { cardInterest: cardInt, loanInterest: loanInt, savings: Math.max(0, cardInt - loanInt) };
  }, [totalDebt, cardApr, loanApr, termMonths]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-black text-brand-navy">Debt Consolidation Calculator</h3>
        <p className="text-sm text-slate-500">
          Compare paying off your balance at credit card APRs vs. a fixed consolidation loan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CalcInput label="Total Debt" prefix="$" value={totalDebt} onChange={setTotalDebt} step={500} />
        <CalcInput label="Term" suffix="mo" value={termMonths} onChange={setTermMonths} step={1} min={1} />
        <CalcInput label="Credit Card APR" suffix="%" value={cardApr} onChange={setCardApr} step={0.1} />
        <CalcInput label="Consolidation Loan APR" suffix="%" value={loanApr} onChange={setLoanApr} step={0.1} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalcResult label="Interest at Card APR" value={formatCurrency(cardInterest)} />
        <CalcResult label="Interest at Loan APR" value={formatCurrency(loanInterest)} />
        <CalcResult label="Total Savings" value={formatCurrency(savings)} emphasis />
      </div>

      <CalcCTA href="https://safebetloans.com/" label="See Consolidation Loan Offers →" />
    </div>
  );
}
