"use client";

export default function CalcInput({ label, value, onChange, prefix, suffix, step, min = 0 }) {
  return (
    <div>
      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          step={step}
          min={min}
          className={`w-full ${prefix ? "pl-8" : "pl-4"} ${suffix ? "pr-10" : "pr-4"} py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-teal`}
        />
        {suffix && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
