"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ShieldCheck, Lock } from "lucide-react";

export default function NewsletterGate() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
    }, 600);
  };

  return (
    <section className="bg-brand-teal text-brand-navy py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Subtle Background Pattern */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-64 h-64 bg-brand-navy/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-brand-navy/10 text-brand-navy px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest">
          <Mail className="w-3.5 h-3.5 text-brand-navy" />
          <span>JOIN 125,000+ DAILY READERS</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-tight">
          Never Miss a Financial Advantage.
        </h2>

        <p className="text-base sm:text-lg text-brand-navy/90 max-w-2xl mx-auto font-medium">
          Get breaking interest rate alerts, credit card balance transfer hacks, and market intelligence delivered directly to your inbox every morning at 7 AM.
        </p>

        {/* Form Container */}
        {subscribed ? (
          <div className="bg-brand-navy text-white p-6 rounded-2xl max-w-xl mx-auto flex items-center justify-center gap-3 shadow-xl border border-brand-navy-light animate-fade-in">
            <CheckCircle2 className="w-8 h-8 text-brand-teal flex-shrink-0" />
            <div className="text-left">
              <h4 className="font-extrabold text-lg text-white">You're Subscribed!</h4>
              <p className="text-xs text-slate-300">Check your inbox to confirm your free GeniusMoneyDaily subscription.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your professional email address..."
                className="w-full pl-11 pr-4 py-4 rounded-xl bg-brand-navy text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white border border-brand-navy-light font-medium text-sm shadow-md"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg transition-all duration-200 uppercase tracking-wider flex items-center justify-center gap-2 border border-brand-navy-light disabled:opacity-75"
            >
              {loading ? (
                <span>Joining...</span>
              ) : (
                <>
                  <span>Subscribe Now</span>
                  <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Disclaimer / Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-brand-navy/80 font-semibold pt-2">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-brand-navy" /> 256-bit SSL Encryption
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-navy" /> No Spam, Ever
          </span>
          <span>•</span>
          <span>Unsubscribe Anytime</span>
        </div>

      </div>
    </section>
  );
}
