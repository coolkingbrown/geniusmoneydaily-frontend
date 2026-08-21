import LegalPageShell from "@/components/LegalPageShell";

export const metadata = {
  title: "Accessibility Notice | GeniusMoneyDaily",
  description: "GeniusMoneyDaily's commitment to digital accessibility.",
};

export default function AccessibilityPage() {
  return (
    <LegalPageShell title="Accessibility Notice">
      <p>Welcome to GeniusMoneyDaily! GeniusMoneyDaily is free to enter.</p>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Options for Assistance</h2>
        <p>
          Clicking the accessibility icon located on the top left of the page will enable you to change font size,
          change color scheme, or underline links.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Formal Complaints</h2>
        <p>
          We aim to respond to accessibility feedback within 5 business days, and to propose a solution within 10
          business days.
        </p>
      </div>

      <div>
        <h2 className="font-extrabold text-brand-navy mb-1">Contact Information</h2>
        <p>
          Phone: (971) 377-2608 | Email:{" "}
          <a href="mailto:contact@geniusmoneydaily.com" className="text-brand-teal font-semibold hover:underline">
            contact@geniusmoneydaily.com
          </a>
        </p>
      </div>
    </LegalPageShell>
  );
}
