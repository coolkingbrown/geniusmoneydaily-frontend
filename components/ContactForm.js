"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { recordLeadPreference } from "@/lib/leadPreferences";
import { sendTransactionalEmail } from "@/lib/sendEmail";

const REASONS = ["General Inquiry", "Advertising / Partnerships", "Editorial / Media", "Compliance / Legal"];

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  businessName: "",
  email: "",
  phone: "",
  reasonToConnect: REASONS[0],
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const updateField = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await recordLeadPreference(
        form.email,
        {
          source: "contact_form",
          reason_to_connect: form.reasonToConnect,
          message: form.message,
          business_name: form.businessName,
        },
        {
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
        }
      );

      // Fire-and-forget: don't let the acknowledgement email delay the success state.
      sendTransactionalEmail({
        type: "contact_acknowledgement",
        to: form.email,
        firstName: form.firstName,
        reasonToConnect: form.reasonToConnect,
      });

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-brand-teal-light border border-brand-teal/30 rounded-2xl p-6 flex items-center gap-3">
        <CheckCircle2 className="w-8 h-8 text-brand-teal flex-shrink-0" />
        <div>
          <h4 className="font-extrabold text-brand-navy">Message Sent</h4>
          <p className="text-sm text-slate-600">
            Thanks for reaching out — our editorial team will respond within 1 business day.
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal";
  const labelClass = "block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label className={labelClass}>Business Name (Optional)</label>
        <input type="text" value={form.businessName} onChange={updateField("businessName")} className={inputClass} />
      </div>

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

      <div>
        <label className={labelClass}>Reason to Connect</label>
        <select required value={form.reasonToConnect} onChange={updateField("reasonToConnect")} className={inputClass}>
          {REASONS.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={updateField("message")}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold text-sm px-10 py-3.5 rounded-xl shadow-teal transition-all disabled:opacity-75"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-xs font-semibold text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
