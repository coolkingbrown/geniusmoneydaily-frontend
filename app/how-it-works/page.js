import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "How It Works | GeniusMoneyDaily",
  description: "How GeniusMoneyDaily matches readers with financial offers and partners.",
};

export default function HowItWorksPage() {
  return (
    <LegalPageShell title="How It Works">
      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">We are supported by ads.</h2>
        <p>
          GeniusMoneyDaily is supported by advertisements. It is completely free to users because we have third
          party advertisers and third party partners on our site and your data may be shared with them. You will be
          asked to opt in to receive ads by email, text message, and/or phone. You do not have to answer the survey
          to use the site.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">We are a guide.</h2>
        <p>
          GeniusMoneyDaily is an aggregator of information about finances. We are in no way affiliated with,
          endorsed or sponsored by the federal government, any other governmental body or any private entity.
        </p>
      </div>
    </LegalPageShell>
  );
}
