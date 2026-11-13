import type { Metadata } from "next";
import { PasswordForm } from "@/components/settings/PasswordForm";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { SampleBadge } from "@/components/dashboard/SampleBadge";

export const metadata: Metadata = { title: "Settings | GrimBank" };

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-4xl tracking-tight text-navy">Settings</h1>
        <SampleBadge />
      </header>
      <ProfileForm />
      <PasswordForm />
    </div>
  );
}
