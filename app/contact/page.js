import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us | GeniusMoneyDaily",
  description: "Get in touch with the GeniusMoneyDaily editorial, advertising, and support teams.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-brand-teal" /> Back to GeniusMoneyDaily
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 lg:p-12 space-y-8">
          <div className="space-y-2 pb-6 border-b border-slate-100">
            <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">Contact Us</h1>
            <p className="text-sm sm:text-base text-slate-500">
              Questions, partnership inquiries, or press requests — our team responds within 1 business day.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-teal" /> (971) 377-2608
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-teal" /> contact@geniusmoneydaily.com
              </span>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
