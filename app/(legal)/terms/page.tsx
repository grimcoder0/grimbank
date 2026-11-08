import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { TERMS_VERSION } from "@/lib/legal/versions";

export const metadata: Metadata = { title: "Terms of Service (draft) | GrimBank" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" version={TERMS_VERSION}>
      <h2>1. About this prototype</h2>
      <p>
        GrimBank is a development prototype. It is not a licensed bank. All
        balances and transactions are simulated and represent no real money.
      </p>

      <h2>2. Accounts and eligibility</h2>
      <p>To be written: who may open an account, age and residency requirements.</p>

      <h2>3. Identity verification</h2>
      <p>
        Identity verification with government-issued identification is planned
        for a later version. When it is introduced, these terms and the Privacy
        Policy will be updated and you will be asked to review them.
      </p>

      <h2>4. Acceptable use</h2>
      <p>To be written.</p>

      <h2>5. Fees, limits and disclosures</h2>
      <p>To be written. No fees apply to the simulated prototype.</p>

      <h2>6. Liability and disputes</h2>
      <p>To be written by qualified legal counsel.</p>

      <h2>7. Changes to these terms</h2>
      <p>To be written, including how users are notified and re-asked to accept.</p>

      <h2>8. Contact</h2>
      <p>To be added once a contact channel exists.</p>
    </LegalPage>
  );
}
