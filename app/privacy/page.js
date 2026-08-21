import LegalPageShell from "@/components/LegalPageShell";
import PrivacyPolicyContent from "@/components/PrivacyPolicyContent";

export const metadata = {
  title: "Privacy Policy | GeniusMoneyDaily",
  description: "How GeniusMoneyDaily collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="GeniusMoneyDaily Privacy Policy" updatedLabel="Effective: October 16, 2025">
      <PrivacyPolicyContent />
    </LegalPageShell>
  );
}
