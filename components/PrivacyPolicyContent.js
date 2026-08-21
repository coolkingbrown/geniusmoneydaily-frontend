import Link from "next/link";

export default function PrivacyPolicyContent() {
  return (
    <>
      <p>
        This Privacy Policy applies to the geniusmoneydaily.com website, operated by Humble Leads Group, DBA
        GeniusMoneyDaily.
      </p>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Information We Collect</h2>
        <p>
          GeniusMoneyDaily collects both Personally Identifiable Information (name, physical address, telephone
          number, email address, date of birth, etc.) and Non-Personally Identifiable Information.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Credit Implications</h2>
        <p>
          The operator of this website does not make any credit decisions. Independent, participating debt relief
          companies and marketing partners may perform soft pulls or hard pulls with credit reporting bureaus.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Privacy Rights of California Residents</h2>
        <p>
          You may opt out by completing one or more forms on our{" "}
          <Link href="/ccpa" className="text-brand-teal font-semibold hover:underline">
            OptOut page
          </Link>
          .
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Contact Us</h2>
        <p>
          geniusmoneydaily.com,{" "}
          <a href="mailto:info@geniusmoneydaily.com" className="text-brand-teal font-semibold hover:underline">
            info@geniusmoneydaily.com
          </a>
          .
        </p>
      </div>
    </>
  );
}
