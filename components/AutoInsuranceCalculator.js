"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/calculators/CalcInput";
import CalcResult from "@/components/calculators/CalcResult";
import CalcCTA from "@/components/calculators/CalcCTA";
import { formatCurrency, clamp } from "@/lib/calculators";

const BASE_SAVINGS_RATE = 0.15;
const NEWER_VEHICLE_BONUS = 0.03;
const OFF_PEAK_AGE_PENALTY = 0.03;
const NEWER_VEHICLE_THRESHOLD_YEARS = 5;

export default function AutoInsuranceCalculator() {
  const [vehicleYear, setVehicleYear] = useState(2020);
  const [driverAge, setDriverAge] = useState(35);
  const [currentPremium, setCurrentPremium] = useState(1400);

  const estimatedAnnualSavings = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - (Number(vehicleYear) || currentYear);

    let rate = BASE_SAVINGS_RATE;
    if (vehicleAge <= NEWER_VEHICLE_THRESHOLD_YEARS) rate += NEWER_VEHICLE_BONUS;
    if (driverAge < 25 || driverAge > 70) rate -= OFF_PEAK_AGE_PENALTY;
    rate = clamp(rate, 0.05, 0.25);

    return (Number(currentPremium) || 0) * rate;
  }, [vehicleYear, driverAge, currentPremium]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-black text-brand-navy">Auto Insurance Savings Estimator</h3>
        <p className="text-sm text-slate-500">See how much you could save by shopping your policy around.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalcInput label="Vehicle Year" value={vehicleYear} onChange={setVehicleYear} step={1} />
        <CalcInput label="Driver Age" value={driverAge} onChange={setDriverAge} step={1} />
        <CalcInput label="Current Premium" prefix="$" suffix="/yr" value={currentPremium} onChange={setCurrentPremium} step={50} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CalcResult label="Estimated Annual Savings" value={formatCurrency(estimatedAnnualSavings)} emphasis />
      </div>

      <CalcCTA href="https://safebetauto.com/" label="Compare Matched Auto Quotes →" />
    </div>
  );
}
