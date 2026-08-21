export default function CalcResult({ label, value, emphasis = false }) {
  return (
    <div className={`rounded-xl p-4 ${emphasis ? "bg-brand-navy" : "bg-slate-50 border border-slate-200"}`}>
      <p
        className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
          emphasis ? "text-brand-teal" : "text-slate-400"
        }`}
      >
        {label}
      </p>
      <p className={`text-xl font-black ${emphasis ? "text-white" : "text-brand-navy"}`}>{value}</p>
    </div>
  );
}
