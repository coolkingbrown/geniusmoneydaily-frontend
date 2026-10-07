// Standard fixed-rate amortizing monthly payment.
export function calcMonthlyPayment(principal, annualRatePct, termMonths) {
  if (!principal || !termMonths || principal <= 0 || termMonths <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / termMonths;
  const factor = Math.pow(1 + r, termMonths);
  return (principal * r * factor) / (factor - 1);
}

// Months required to pay off a revolving balance with a fixed monthly
// payment. Returns null if the payment never covers accruing interest.
export function calcPayoffMonths(balance, annualRatePct, monthlyPayment) {
  if (!balance || !monthlyPayment || balance <= 0 || monthlyPayment <= 0) return null;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return balance / monthlyPayment;
  const minPayment = balance * r;
  if (monthlyPayment <= minPayment) return null;
  return -Math.log(1 - (r * balance) / monthlyPayment) / Math.log(1 + r);
}

// Simulates a fixed-payment amortizing loan with one optional lump-sum
// payment applied in a given month, to answer "what if I pay this off early
// with a windfall like a tax refund?" The regular payment is still the one
// computed for the full original term — only the payoff timeline and total
// interest change based on when (and how much) extra is applied.
export function simulateLoanWithLumpSum(principal, annualRatePct, termMonths, lumpSum = 0, lumpSumMonth = 0) {
  const payment = calcMonthlyPayment(principal, annualRatePct, termMonths);
  if (!payment || principal <= 0) return { monthsToPayoff: 0, totalInterest: 0 };

  const r = annualRatePct / 100 / 12;
  let balance = principal;
  let totalInterest = 0;
  let month = 0;

  while (balance > 0.01 && month < termMonths + 600) {
    month += 1;
    const interest = balance * r;
    let principalPortion = payment - interest;
    if (principalPortion > balance) principalPortion = balance;
    balance -= principalPortion;
    totalInterest += interest;

    if (month === lumpSumMonth && lumpSum > 0) {
      balance = Math.max(0, balance - lumpSum);
    }
  }

  return { monthsToPayoff: month, totalInterest };
}

export function formatCurrency(value, fractionDigits = 0) {
  if (!Number.isFinite(value)) return fractionDigits > 0 ? "$0.00" : "$0";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export function formatMonths(months) {
  if (!Number.isFinite(months) || months <= 0) return "—";
  const years = Math.floor(months / 12);
  const remMonths = Math.round(months % 12);
  if (years === 0) return `${remMonths} mo`;
  if (remMonths === 0) return `${years} yr`;
  return `${years} yr ${remMonths} mo`;
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
