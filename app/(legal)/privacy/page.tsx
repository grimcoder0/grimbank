import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { PRIVACY_VERSION } from "@/lib/legal/versions";

export const metadata: Metadata = { title: "Privacy Policy (draft) | GrimBank" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" version={PRIVACY_VERSION}>
      <h2>1. What the prototype collects today</h2>
      <p>
        Nothing. The sign-in and sign-up forms validate what you type in your
        browser but do not send or store it yet.
      </p>

      <h2>2. What account creation will collect</h2>
      <ul>
        <li>Your full name and email address.</li>
        <li>A password, stored only as a secure hash and never in plain text.</li>
        <li>The version and time at which you accepted the Terms and this Policy.</li>
      </ul>

      <h2>3. What we do not collect at sign-up</h2>
      <p>
        We do not ask for bank login credentials or payment card details to
        create an account.
      </p>

      <h2>4. Identity verification (planned)</h2>
      <p>
        A later version is expected to verify identity using government-issued
        identification. This policy will be updated with exactly what is
        collected, why, who processes it and how long it is kept, before any of
        it is requested.
      </p>

      <h2>5. Retention, deletion and your rights</h2>
      <p>
        To be written to match the data-protection laws that apply where
        GrimBank operates.
      </p>

      <h2>6. Contact</h2>
      <p>To be added once a contact channel exists.</p>
    </LegalPage>
  );
}
