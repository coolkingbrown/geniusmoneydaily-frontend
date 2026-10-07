"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/calculators/CalcInput";
import CalcResult from "@/components/calculators/CalcResult";
import CalcCTA from "@/components/calculators/CalcCTA";
import { calcPayoffMonths, formatCurrency, formatMonths } from "@/lib/calculators";
import { buildMoneyAidLink, OFFER_SLUGS } from "@/lib/moneyAid";

const TOOL_SLUG = "credit-card-payoff-calculator";

// Reference rate used purely for the "what a fixed consolidation loan would
// cost instead" comparison, shown clearly in the UI.
const CONSOLIDATION_APR = 12.99;

// Balance at or above which we also surface a debt-relief option alongside
// the consolidation-loan CTA.
const DEBT_RELIEF_THRESHOLD = 10000;

export default function CreditCardPayoffCalculator({ initialValues = {} }) {
  const [balance, setBalance] = useState(initialValues.balance ?? 8000);
  const [apr, setApr] = useState(initialValues.apr ?? 22.99);
  const [payment, setPayment] = useState(initialValues.payment ?? 250);

  const result = useMemo(() => {
    const payoffMonths = calcPayoffMonths(balance, apr, payment);
    if (!payoffMonths) return null;

    const totalPaid = payment * payoffMonths;
    const totalInterest = totalPaid - balance;

    const consolidationMonths = calcPayoffMonths(balance, CONSOLIDATION_APR, payment);
    let consolidationSavings = 0;
    if (consolidationMonths) {
      const consolidationInterest = payment * consolidationMonths - balance;
      consolidationSavings = Math.max(0, totalInterest - consolidationInterest);
    }

    return { payoffMonths, totalInterest, consolidationSavings };
  }, [balance, apr, payment]);

  const showDebtReliefCta = (Number(balance) || 0) >= DEBT_RELIEF_THRESHOLD;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-black text-brand-navy">Credit Card Payoff Calculator</h3>
        <p className="text-sm text-slate-500">See how long your balance will take to pay off at your current rate.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalcInput label="Balance" prefix="$" value={balance} onChange={setBalance} step={100} />
        <CalcInput label="APR" suffix="%" value={apr} onChange={setApr} step={0.1} />
        <CalcInput label="Monthly Payment" prefix="$" value={payment} onChange={setPayment} step={25} />
      </div>

      {result ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalcResult label="Payoff Time" value={formatMonths(result.payoffMonths)} emphasis />
            <CalcResult label="Total Interest" value={formatCurrency(result.totalInterest)} />
            <CalcResult
              label={`Savings via ${CONSOLIDATION_APR}% Consolidation`}
              value={formatCurrency(result.consolidationSavings)}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Consolidation comparison assumes a fixed {CONSOLIDATION_APR}% loan at the same monthly payment. This is
            an illustrative estimate, not a guaranteed rate or savings.
          </p>
        </>
      ) : (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl p-4">
          At this APR, your monthly payment doesn't cover the interest that accrues — increase your payment to see a
          payoff timeline.
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <CalcCTA
          href={buildMoneyAidLink(OFFER_SLUGS.SAFE_BET_LOANS, TOOL_SLUG)}
          label="Lower My Credit Card APR →"
        />
        {showDebtReliefCta && (
          <CalcCTA
            href={buildMoneyAidLink(OFFER_SLUGS.DEBTHUNCH, TOOL_SLUG)}
            label="Explore Debt Relief Options →"
            variant="secondary"
          />
        )}
      </div>
    </div>
  );
}
