"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { recordLeadPreference } from "@/lib/leadPreferences";

export default function UnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");

    try {
      await recordLeadPreference(email, {
        unsubscribed: true,
        unsubscribed_at: new Date().toISOString(),
      });
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-brand-teal-light border border-brand-teal/30 rounded-2xl p-5 flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-brand-teal flex-shrink-0" />
        <p className="text-sm font-semibold text-brand-navy">
          You&apos;ve been unsubscribed. It may take a few days for all emails to stop.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
        Email Address
      </label>
      <div className="relative">
        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold text-sm px-6 py-3 rounded-xl transition-all disabled:opacity-75"
      >
        {status === "submitting" ? "Submitting..." : "Unsubscribe"}
      </button>

      {status === "error" && (
        <p className="text-xs font-semibold text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
