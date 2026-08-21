"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  Mail,
  Lock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  User,
  MapPin,
  Calendar,
  Phone,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// Survey/offer pathing config for Step 3. `isOffer` questions log an
// accepted_yes interaction and open offer_url when the user clicks Yes.
const SURVEY_QUESTIONS = [
  {
    key: "income",
    headline: "What is your approximate annual household income?",
    type: "choice",
    options: [
      { label: "Above $55,000", value: "above_55000" },
      { label: "$35,000 - $55,000", value: "35000_55000" },
      { label: "$12,500 - $35,000", value: "12500_35000" },
      { label: "Below $12,500", value: "below_12500" },
    ],
  },
  {
    key: "checking_account",
    headline: "Do you have an active checking account?",
    type: "yesno",
    yesBounce: true,
  },
  {
    key: "credit_score",
    headline: "How would you rate your current credit score?",
    type: "choice",
    options: [
      { label: "Excellent (720-850)", value: "excellent" },
      { label: "Good (690-719)", value: "good" },
      { label: "Fair (630-689)", value: "fair" },
      { label: "Poor (300-629)", value: "poor" },
    ],
  },
  {
    key: "cash_now",
    headline: "Need cash quick? $2,500 - $40,000",
    type: "yesno",
    yesBounce: true,
    isOffer: true,
    offerUrl: "https://www.upstart.com/",
  },
  {
    key: "car_ownership",
    headline: "Do you own a car newer than 1990?",
    type: "yesno",
  },
  {
    key: "auto_accident",
    headline: "Were You in an Auto Accident in the Last 12 Months?",
    type: "yesnoskip",
    isOffer: true,
    offerUrl: "https://www.legalmatch.com/",
  },
  {
    key: "life_insurance",
    headline: "{first_name}, You can get $250,000 in life insurance!",
    type: "yesno",
    isOffer: true,
    offerUrl: "https://www.selectquote.com/",
  },
  {
    key: "rising_costs",
    headline: "Worried About the Rising Cost of Everything?",
    type: "yesno",
    isOffer: true,
    offerUrl: "https://www.goldco.com/",
  },
  {
    key: "education",
    headline: "{first_name}, interested in furthering your education?",
    type: "choice",
    options: [
      { label: "Yes", value: "yes" },
      { label: "Undecided", value: "undecided" },
      { label: "Not Interested", value: "not_interested" },
    ],
  },
];

const EMPTY_PII = {
  firstName: "",
  lastName: "",
  streetAddress: "",
  zipCode: "",
  dob: "",
  phone: "",
};

export default function CoRegFunnel() {
  const [step, setStep] = useState("email"); // email | pii | survey | complete
  const [email, setEmail] = useState("");
  const [pii, setPii] = useState(EMPTY_PII);
  const [firstName, setFirstName] = useState("");
  const [leadId, setLeadId] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [surveyResponses, setSurveyResponses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const personalize = (text) =>
    text.replace(/\{first_name\}(,\s*)?/g, firstName ? `${firstName}, ` : "");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStep("pii");
  };

  const handlePiiSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Generate the id client-side so we don't need a post-insert SELECT
    // (avoids relying on RLS read access just to get the new row back).
    const newLeadId = crypto.randomUUID();

    try {
      const { error: insertError } = await supabase.from("leads").insert([
        {
          id: newLeadId,
          email,
          first_name: pii.firstName,
          last_name: pii.lastName,
          street_address: pii.streetAddress,
          zip_code: pii.zipCode,
          dob: pii.dob,
          phone: pii.phone,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        console.error("Error creating lead:", insertError);
        setError("Something went wrong saving your info. Please try again.");
        return;
      }

      setLeadId(newLeadId);
      setFirstName(pii.firstName);
      setStep("survey");
    } catch (err) {
      console.error("Lead submission error:", err);
      setError("Something went wrong saving your info. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const goToNextQuestion = () => {
    setQuestionIndex((idx) => {
      const next = idx + 1;
      if (next >= SURVEY_QUESTIONS.length) {
        setStep("complete");
        return idx;
      }
      return next;
    });
  };

  const logOfferInteraction = (question) => {
    if (!leadId) return;
    supabase
      .from("lead_offer_interactions")
      .insert([
        {
          lead_id: leadId,
          question_key: question.key,
          offer_url: question.offerUrl,
          interaction_type: "accepted_yes",
          created_at: new Date().toISOString(),
        },
      ])
      .then(({ error: interactionError }) => {
        if (interactionError) {
          console.error("Error logging offer interaction:", interactionError);
        }
      });
  };

  const handleAnswer = (question, value) => {
    const updatedResponses = { ...surveyResponses, [question.key]: value };
    setSurveyResponses(updatedResponses);

    // Optimistic write: UI advances immediately, Supabase syncs in the background.
    if (leadId) {
      supabase
        .from("leads")
        .update({ survey_responses: updatedResponses })
        .eq("id", leadId)
        .then(({ error: updateError }) => {
          if (updateError) {
            console.error("Error saving survey response:", updateError);
          }
        });
    }

    goToNextQuestion();
  };

  const handleOfferYes = (question) => {
    // Must fire synchronously (before any await) or browsers block the popup.
    if (question.offerUrl) {
      window.open(question.offerUrl, "_blank", "noopener,noreferrer");
    }
    logOfferInteraction(question);
    handleAnswer(question, "yes");
  };

  const currentQuestion = SURVEY_QUESTIONS[questionIndex];
  const progressPct = ((questionIndex + 1) / SURVEY_QUESTIONS.length) * 100;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 p-8 sm:p-10">
      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className="space-y-6 text-center animate-fade-in">
          <div className="inline-flex items-center gap-1.5 bg-brand-teal/15 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limited-Time Financial Match</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight leading-tight">
            Get a Cash Deposit up to $5,000!
          </h2>

          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Enter your email to see if you're pre-qualified. Takes less than 60 seconds.
          </p>

          <div className="relative max-w-sm mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full pl-11 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>

          <button
            type="submit"
            className="w-full max-w-sm mx-auto bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold text-base py-4 rounded-xl shadow-teal transition-all flex items-center justify-center gap-2 group"
          >
            <span>Check My Eligibility</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" /> Your information is encrypted and never sold.
          </p>
        </form>
      )}

      {step === "pii" && (
        <form onSubmit={handlePiiSubmit} className="space-y-5 animate-fade-in">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Almost There! Complete Your Profile</h3>
            <p className="text-xs text-slate-500">We use this to match you with pre-qualified offers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                First Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={pii.firstName}
                  onChange={(e) => setPii({ ...pii, firstName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                Last Name
              </label>
              <input
                type="text"
                required
                value={pii.lastName}
                onChange={(e) => setPii({ ...pii, lastName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
              Street Address
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={pii.streetAddress}
                onChange={(e) => setPii({ ...pii, streetAddress: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                Zip Code
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                pattern="[0-9]{5}"
                maxLength={5}
                value={pii.zipCode}
                onChange={(e) => setPii({ ...pii, zipCode: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  required
                  value={pii.dob}
                  onChange={(e) => setPii({ ...pii, dob: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={pii.phone}
                onChange={(e) => setPii({ ...pii, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>
          </div>

          {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold text-base py-4 rounded-xl shadow-teal transition-all flex items-center justify-center gap-2 group disabled:opacity-75"
          >
            {submitting ? (
              <span>Saving...</span>
            ) : (
              <>
                <span>See My Matched Offers</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" /> Your information is encrypted and never sold to third parties.
          </p>
        </form>
      )}

      {step === "survey" && currentQuestion && (
        <div className="space-y-6 animate-fade-in">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Question {questionIndex + 1} of {SURVEY_QUESTIONS.length}
              </span>
              <span className="text-xs font-semibold text-slate-400">GeniusMoneyDaily Survey</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-teal rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-brand-navy leading-tight text-center py-4">
            {personalize(currentQuestion.headline)}
          </h3>

          {currentQuestion.type === "choice" && (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleAnswer(currentQuestion, option.value)}
                  className="w-full bg-slate-50 hover:bg-brand-navy hover:text-white border border-slate-200 text-slate-800 font-bold py-4 px-6 rounded-xl transition-all text-sm text-left"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {(currentQuestion.type === "yesno" || currentQuestion.type === "yesnoskip") && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    currentQuestion.isOffer
                      ? handleOfferYes(currentQuestion)
                      : handleAnswer(currentQuestion, "yes")
                  }
                  className={clsx(
                    "w-full bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold py-4 px-6 rounded-xl shadow-md transition-all border border-brand-navy-light flex items-center justify-center gap-2 group text-base",
                    currentQuestion.yesBounce && "animate-cta-bounce"
                  )}
                >
                  <span>Yes</span>
                  <CheckCircle2 className="w-5 h-5 text-brand-teal group-hover:scale-110 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => handleAnswer(currentQuestion, "no")}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold py-4 px-6 rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-2 text-base"
                >
                  <span>No</span>
                </button>
              </div>

              {currentQuestion.type === "yesnoskip" && (
                <button
                  type="button"
                  onClick={() => handleAnswer(currentQuestion, "skip")}
                  className="w-full text-slate-400 hover:text-slate-600 font-semibold py-2 text-xs uppercase tracking-wider"
                >
                  Skip this question
                </button>
              )}
            </div>
          )}

          {currentQuestion.isOffer && (
            <p className="text-[11px] text-slate-400 text-center">
              Clicking "Yes" opens the offer securely in a new window.
            </p>
          )}
        </div>
      )}

      {step === "complete" && (
        <div className="text-center space-y-6 py-8 animate-fade-in">
          <div className="w-16 h-16 bg-brand-teal/20 text-brand-teal rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-[#00D29F]" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-brand-navy">
              {firstName ? `You're all set, ${firstName}!` : "You're all set!"}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Check your inbox for your customized financial updates and matched offers.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 font-semibold pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" /> Encrypted & Secure
            </span>
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold px-8 py-3.5 rounded-xl shadow-md transition-colors text-sm gap-2"
            >
              <span>Return to News Hub</span>
              <ArrowRight className="w-4 h-4 text-brand-teal" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
