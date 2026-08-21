import LegalPageShell from "@/components/LegalPageShell";
import PrivacyPolicyContent from "@/components/PrivacyPolicyContent";

export const metadata = {
  title: "Privacy Notice | GeniusMoneyDaily",
  description: "State-specific consumer privacy disclosures for GeniusMoneyDaily readers.",
};

export default function PrivacyNoticePage() {
  return (
    <LegalPageShell title="Privacy Notice" updatedLabel="Effective: October 16, 2023">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider -mt-2">
        State-Specific Consumer Disclosures
      </p>
      <PrivacyPolicyContent />
    </LegalPageShell>
  );
}
