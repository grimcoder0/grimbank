"use client";

import { useState, type FormEvent } from "react";
import { SAMPLE_PROFILE } from "@/lib/sample-profile";
import { validateProfile, type ProfileErrors } from "@/lib/settings";

const fieldClasses =
  "h-11 w-full rounded-lg border border-cream-line bg-white px-3 text-sm text-ink";

export function ProfileForm() {
  const [name, setName] = useState(SAMPLE_PROFILE.name);
  const [email, setEmail] = useState(SAMPLE_PROFILE.email);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateProfile({ name, email });
    if (!result.ok) {
      setErrors(result.errors);
      setNotice(null);
      return;
    }
    setErrors({});
    setNotice(
      "Saving profile changes isn't available yet. Changes will be stored once the back end is connected.",
    );
  }

  return (
    <section
      aria-labelledby="profile-heading"
      className="rounded-xl border border-cream-line bg-cream-field p-6 md:p-8"
    >
      <h2 id="profile-heading" className="text-lg font-semibold text-navy">
        Profile
      </h2>
      <form noValidate onSubmit={handleSubmit} className="mt-5 space-y-5">
        <div>
          <label htmlFor="profile-name" className="mb-1.5 block text-xs font-semibold text-ink">
            Full name
          </label>
          <input
            id="profile-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "profile-name-error" : undefined}
            className={fieldClasses}
          />
          {errors.name && (
            <p id="profile-name-error" className="mt-1.5 text-sm text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="profile-email" className="mb-1.5 block text-xs font-semibold text-ink">
            Email address
          </label>
          <input
            id="profile-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "profile-email-error" : undefined}
            className={fieldClasses}
          />
          {errors.email && (
            <p id="profile-email-error" className="mt-1.5 text-sm text-danger">
              {errors.email}
            </p>
          )}
        </div>

        {notice && (
          <p role="status" className="rounded-lg border border-cream-line bg-white px-4 py-3 text-sm text-ink">
            {notice}
          </p>
        )}

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-navy px-5 text-sm font-semibold text-white hover:bg-navy-deep"
        >
          Save profile
        </button>
      </form>
    </section>
  );
}
