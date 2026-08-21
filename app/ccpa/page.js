import Link from "next/link";
import LegalPageShell from "@/components/LegalPageShell";
import OptOutForm from "@/components/OptOutForm";

export const metadata = {
  title: "Do Not Sell or Share My Personal Information | GeniusMoneyDaily",
  description: "Submit a request to opt out of the sale or sharing of your personal information.",
};

export default function CcpaPage() {
  return (
    <LegalPageShell title="Do Not Sell or Share My Personal Information">
      <p>
        If you are a resident of California, Colorado, Connecticut, Delaware, Indiana, Iowa, Kentucky, Maryland,
        Minnesota, Montana, Nebraska, Nevada, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah
        or Virginia, you may be able to opt-out from our sale and/or our sharing of your personal information
        to/with third parties by indicating below, and providing the requisite information. Residents of other
        states are not entitled to use the following form. For additional discussion of your privacy rights, please
        visit our Privacy Policy at{" "}
        <Link href="/privacy" className="text-brand-teal font-semibold hover:underline">
          geniusmoneydaily.com/privacy-policy
        </Link>
        .
      </p>

      <div className="pt-2">
        <OptOutForm />
      </div>

      <div className="pt-8 mt-8 border-t border-slate-100 text-xs text-slate-400 leading-relaxed">
        <p>
          Users with disabilities (and any other users) who wish to opt-out of the sale and/or sharing of their
          personal information can also contact us by calling us at: (971) 377-2608; emailing us at:{" "}
          <a href="mailto:contact@geniusmoneydaily.com" className="text-brand-teal font-semibold hover:underline">
            contact@geniusmoneydaily.com
          </a>
          ; or sending us mail to: 11575 SW Pacific Hwy #2057 Tigard, OR 97223. If we have a good-faith, reasonable
          and documented belief that a request to opt-out is fraudulent, we may deny the request. When you make a
          request to opt-out of the sale and/or sharing of your personal information through an authorized agent,
          we will require that you or the authorized agent provide us with a valid written authorization executed
          by both parties, with the validity of such document determined by us in our reasonable, good faith
          discretion. Please submit such documentation to us at: contact@geniusmoneydaily.com or 11575 SW Pacific
          Hwy #2057 Tigard, OR 97223.
        </p>
      </div>
    </LegalPageShell>
  );
}
