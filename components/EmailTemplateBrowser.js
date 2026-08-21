"use client";

import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";

export default function EmailTemplateBrowser({ templates }) {
  const [activeId, setActiveId] = useState(templates[0]?.id);
  const [copied, setCopied] = useState(false);

  const active = templates.find((tpl) => tpl.id === activeId) || templates[0];

  const handleSelect = (id) => {
    setActiveId(id);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy to clipboard failed:", err);
    }
  };

  if (!active) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-72 bg-brand-navy text-white p-6 space-y-1 flex-shrink-0">
        <div className="pb-4 mb-4 border-b border-brand-navy-light">
          <h1 className="text-lg font-black flex items-center gap-2">
            <Mail className="w-5 h-5 text-brand-teal" /> Email Template Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">Internal preview — not indexed, not access-controlled</p>
        </div>
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            type="button"
            onClick={() => handleSelect(tpl.id)}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
              activeId === tpl.id ? "bg-brand-teal text-white" : "text-slate-300 hover:bg-brand-navy-light"
            }`}
          >
            {tpl.label}
          </button>
        ))}
      </aside>

      {/* Preview panel */}
      <main className="flex-1 p-6 lg:p-10 space-y-4 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject Line</p>
            <h2 className="text-lg font-extrabold text-brand-navy truncate">{active.subject}</h2>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors flex-shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-brand-teal" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy Raw HTML"}
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <iframe title={active.label} srcDoc={active.html} className="w-full h-[720px] bg-slate-50" sandbox="" />
        </div>
      </main>
    </div>
  );
}
