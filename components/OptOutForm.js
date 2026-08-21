"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { recordLeadPreference } from "@/lib/leadPreferences";
import { US_STATES } from "@/lib/usStates";

const EMPTY_FORM = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
};

export default function OptOutForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [gpcDetected, setGpcDetected] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.globalPrivacyControl) {
      setGpcDetected(true);
    }
  }, []);

  const updateField = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await recordLeadPreference(
        form.email,
        {
          ccpa_opt_out: true,
          opt_out_timestamp: new Date().toISOString(),
        },
        {
          first_name: form.firstName,
          last_name: form.lastName,
          street_address: form.address,
          city: form.city,
          state: form.state,
          zip_code: form.zip,
          phone: form.phone,
        }
      );
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-brand-teal-light border border-brand-teal/30 rounded-2xl p-5 flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-brand-teal flex-shrink-0" />
        <p className="text-sm font-semibold text-brand-navy">
          Your opt-out request has been recorded. We will not sell or share your personal information.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal";
  const labelClass = "block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1";

  return (
    <div className="space-y-5">
      <p className="text-sm font-bold text-red-600">
        {gpcDetected
          ? "An Opt-Out Preference Signal has been detected."
          : "No Opt-Out Preference Signal has been detected."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" required value={form.email} onChange={updateField("email")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="tel" required value={form.phone} onChange={updateField("phone")} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name</label>
            <input type="text" required value={form.firstName} onChange={updateField("firstName")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input type="text" required value={form.lastName} onChange={updateField("lastName")} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Address</label>
          <input type="text" required value={form.address} onChange={updateField("address")} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>City</label>
            <input type="text" required value={form.city} onChange={updateField("city")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>State</label>
            <select required value={form.state} onChange={updateField("state")} className={inputClass}>
              <option value="" disabled>
                Select a state
              </option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Zip</label>
            <input
              type="text"
              required
              inputMode="numeric"
              pattern="[0-9]{5}"
              maxLength={5}
              value={form.zip}
              onChange={updateField("zip")}
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold text-sm px-10 py-3.5 rounded-xl transition-all disabled:opacity-75 uppercase tracking-wider"
        >
          {status === "submitting" ? "Submitting..." : "Submit"}
        </button>

        {status === "error" && (
          <p className="text-xs font-semibold text-red-600">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}
