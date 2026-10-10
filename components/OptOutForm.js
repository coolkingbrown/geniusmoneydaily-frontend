"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Info } from "lucide-react";
import { recordLeadPreference } from "@/lib/leadPreferences";
import { US_STATES } from "@/lib/usStates";
import HoneypotField from "@/components/HoneypotField";

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

const FIELD_LABELS = {
  email: "Email",
  firstName: "First name",
  lastName: "Last name",
  address: "Address",
  city: "City",
  state: "State",
  zip: "Zip code",
  phone: "Phone",
};

const REQUIRED_FIELDS = ["email", "firstName", "lastName", "address", "city", "state", "zip", "phone"];

// Lightweight client-side check so a missing or malformed field surfaces as
// a clear, app-styled message instead of a browser-native validation
// tooltip that's easy to miss (the form uses noValidate for this reason).
function validateOptOutForm(form) {
  for (const field of REQUIRED_FIELDS) {
    if (!form[field] || !form[field].trim()) {
      return `${FIELD_LABELS[field]} is required.`;
    }
  }
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    return "Please enter a valid email address.";
  }
  if (!/^\d{5}$/.test(form.zip.trim())) {
    return "Zip code must be exactly 5 digits.";
  }
  return null;
}

export default function OptOutForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | invalid | error
  const [errorMessage, setErrorMessage] = useState("");
  const [gpcDetected, setGpcDetected] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.globalPrivacyControl) {
      setGpcDetected(true);
    }
  }, []);

  const updateField = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const validationError = validateOptOutForm(form);
    if (validationError) {
      setErrorMessage(validationError);
      setStatus("invalid");
      return;
    }

    setStatus("submitting");

    try {
      await recordLeadPreference(
        "opt_out",
        {
          email: form.email,
          first_name: form.firstName,
          last_name: form.lastName,
          street_address: form.address,
          city: form.city,
          state: form.state,
          zip_code: form.zip,
          phone: form.phone,
        },
        website
      );
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong.");
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
      <div className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <p>
          {gpcDetected
            ? "Your browser sent us a Global Privacy Control signal."
            : "Your browser did not send a Global Privacy Control signal."}{" "}
          Either way, submitting the form below is itself a valid opt-out request — no browser signal is required.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <HoneypotField value={website} onChange={(e) => setWebsite(e.target.value)} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={form.email} onChange={updateField("email")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="tel" value={form.phone} onChange={updateField("phone")} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name</label>
            <input type="text" value={form.firstName} onChange={updateField("firstName")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input type="text" value={form.lastName} onChange={updateField("lastName")} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Address</label>
          <input type="text" value={form.address} onChange={updateField("address")} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>City</label>
            <input type="text" value={form.city} onChange={updateField("city")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>State</label>
            <select value={form.state} onChange={updateField("state")} className={inputClass}>
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
              inputMode="numeric"
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

        {status === "invalid" && (
          <p className="text-xs font-semibold text-red-600">{errorMessage}</p>
        )}

        {status === "error" && (
          <p className="text-xs font-semibold text-red-600">
            {errorMessage || "Something went wrong."} Please try again, or if this keeps happening, email{" "}
            <a href="mailto:contact@geniusmoneydaily.com" className="underline">
              contact@geniusmoneydaily.com
            </a>{" "}
            and we&apos;ll process your opt-out request directly.
          </p>
        )}
      </form>
    </div>
  );
}
