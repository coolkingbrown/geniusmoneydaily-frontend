"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, Lock, Sparkles, TrendingUp } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    financialGoal: "Debt Payoff & Refinancing",
    incomeRange: "$75,000 - $125,000",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Back link */}
        <div>
          <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-brand-navy gap-1">
            ← Back to GeniusMoneyDaily.com
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Side Banner (Deep Navy #1A2045) */}
          <div className="md:col-span-5 bg-brand-navy text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-brand-navy-light text-brand-teal px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border border-brand-teal/30">
                <Sparkles className="w-3.5 h-3.5" /> 100% Free Access
              </div>

              <h2 className="text-3xl font-extrabold leading-tight">
                Build Your Customized Daily Financial Plan
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Unlock personalized interest rate alerts, credit score improvement roadmaps, and custom tax planning toolkits tailored to your profile.
              </p>

              <div className="space-y-3 pt-4 border-t border-brand-navy-light/60">
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                  <span>Personalized High-Yield Savings Matrix</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                  <span>Direct Debt Refinance Savings Calculations</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                  <span>Zero Credit Inquiry Required</span>
                </div>
              </div>
            </div>

            <div className="pt-8 text-[11px] text-slate-400 border-t border-brand-navy-light/40 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-teal" />
              <span>Not affiliated with any state or federal government agency.</span>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
            {submitted ? (
              <div className="text-center space-y-4 py-8">
                <div className="w-16 h-16 bg-brand-teal-light text-brand-teal rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-extrabold text-brand-navy">Your Plan is Ready!</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  We've generated your financial briefing. Check your inbox at <strong className="text-brand-navy">{formData.email}</strong> to activate your plan.
                </p>
                <div className="pt-4">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-brand-navy text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-navy-light transition-colors text-sm"
                  >
                    Return to News Hub
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Get Your Free Financial Plan</h3>
                  <p className="text-xs text-slate-500">Takes less than 60 seconds. No credit card required.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Financial Goal
                    </label>
                    <select
                      value={formData.financialGoal}
                      onChange={(e) => setFormData({ ...formData, financialGoal: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    >
                      <option>Debt Payoff & Refinancing</option>
                      <option>High-Yield Savings & Cash Management</option>
                      <option>Credit Score Building (FICO 750+)</option>
                      <option>Real Estate & Mortgage Planning</option>
                      <option>Tax Strategy & Wealth Preservation</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold text-base py-4 rounded-xl shadow-teal transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Generate My Free Plan</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" /> Your information is encrypted and never sold to third parties.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
