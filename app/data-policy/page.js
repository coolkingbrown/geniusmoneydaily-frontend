import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "Data Policy | GeniusMoneyDaily",
  description: "How GeniusMoneyDaily handles, stores, and shares user data.",
};

export default function DataPolicyPage() {
  return (
    <LegalPageShell title="GeniusMoneyDaily Data Policy">
      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Data We Will Collect</h2>
        <p>Your contact information and answers to our optional survey.</p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">What You Will Get</h2>
        <p>Our free guide, and if you answer the optional survey, marketing offers from our partners.</p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Use and Sale</h2>
        <p>If you answer the optional survey, we will send your answers to our marketing partners.</p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Who We Share Your Data With</h2>
        <p>Our marketing partners.</p>
      </div>
    </LegalPageShell>
  );
}
