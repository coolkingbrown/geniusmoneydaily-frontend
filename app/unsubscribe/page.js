import LegalPageShell from "@/components/LegalPageShell";
import UnsubscribeForm from "@/components/UnsubscribeForm";

export const metadata = {
  title: "Unsubscribe | GeniusMoneyDaily",
  description: "Unsubscribe from GeniusMoneyDaily email communications.",
};

export default function UnsubscribePage() {
  return (
    <LegalPageShell title="Unsubscribe" updatedLabel={null}>
      <p className="text-slate-500">
        Enter the email address you&apos;d like to unsubscribe from GeniusMoneyDaily communications.
      </p>

      <div className="pt-2">
        <UnsubscribeForm />
      </div>
    </LegalPageShell>
  );
}
