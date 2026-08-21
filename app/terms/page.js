import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "Terms & Conditions | GeniusMoneyDaily",
  description: "The terms and conditions governing use of GeniusMoneyDaily.",
};

export default function TermsPage() {
  return (
    <LegalPageShell title="GeniusMoneyDaily Terms and Conditions" updatedLabel="Effective: June 13, 2022">
      <p>
        By accessing the geniusmoneydaily.com website (the &quot;Website&quot;), operated by Humble Leads Group, DBA
        GeniusMoneyDaily (&quot;GeniusMoneyDaily,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you
        agree to be bound by these Terms and Conditions (the &quot;Terms&quot;) and all policies and guidelines
        incorporated by reference.
      </p>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Description of Service</h2>
        <p>
          The GeniusMoneyDaily Website provides information regarding GeniusMoneyDaily debt resolution services.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">User Conduct & Obligations</h2>
        <p>
          As a condition of your use of the Services you, the User, agree to provide true, accurate, current, and
          complete information.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Debt Decisions</h2>
        <p>GeniusMoneyDaily is not a debt collector and does not make debt collection decisions.</p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Electronic Disclosure</h2>
        <p>You agree to receive all required disclosures and documents electronically.</p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Binding Arbitration of Disputes</h2>
        <p className="uppercase text-xs sm:text-sm tracking-wide">
          Any claim or controversy will be settled exclusively by binding arbitration in accordance with the
          commercial arbitration rules of the American Arbitration Association, in Los Angeles, California.
        </p>
      </div>
    </LegalPageShell>
  );
}
