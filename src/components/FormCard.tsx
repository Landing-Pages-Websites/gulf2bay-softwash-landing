"use client";

import { useState, useRef } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import {
  HOMEOWNER_OPTIONS,
  FACTOR_OPTIONS,
  isQualifiedLead,
  type HomeownerValue,
  type FactorValue,
  BRAND,
} from "@/lib/content";

type Props = {
  variant?: "hero" | "card" | "inline";
  heading?: string;
  subheading?: string;
  idSuffix?: string;
};

/**
 * Gulf2Bay Softwash — lead form.
 * Task: aa76a8ad-9749-4ea3-b28c-dfd295378eb8
 *
 * Fields (EXACT, in submit order — 1:1 with task input `form_fields`):
 *   1. firstName        required
 *   2. lastName         required
 *   3. email            required
 *   4. phone            required (10-digit US)
 *   5. homeowner        required — Q1: 'Are you the homeowner or property manager?'
 *   6. factor           required — Q2: 'What factor is most important when hiring a contractor?'
 *
 * Submission policy (per task spec):
 *   - EVERY filled form submits to the lead API.
 *   - LP marks qualified: true|false + disqualification_reason on the payload
 *     so the backend can fire the `qualified_lead` Google Ads conversion only
 *     for qualified leads. Disqualified leads still land in the lead pipeline.
 *   - Mega Admin docs require BOTH paths reach the API (Peter mandate 2026-05-14).
 *
 * Anti-disruption pattern (button type="button" + validate-first + direct
 * performSubmit) prevents Mega optimizer from firing duplicate form_submit; the
 * native submit event is dispatched once, by hand, only after a real success.
 */

// Shown in-place (never a success card) when a submit fails: HTTP error,
// network drop, or a 2xx body that is not { ok: true }. Retryable, and points
// to the authorized business line as plain text via BRAND.phone.
const SUBMIT_ERROR_MESSAGE = `Something went wrong sending your request. Please try again, or call us at ${BRAND.phone}.`;

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const ChevronDown = () => (
  <svg
    className="w-5 h-5 text-[var(--color-ink-muted)]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function FormCard({
  variant = "card",
  heading = "Request your free restoration estimate",
  subheading = "Tell us about the property. We'll be in touch within 24 hours to schedule an on-site assessment.",
  idSuffix = "main",
}: Props) {
  const { submit } = useMegaLeadForm();
  const formRef = useRef<HTMLFormElement>(null);
  // Synchronous in-flight guard. React's setSubmitting is async, so multiple
  // rapid clicks can pass the `if (submitting) return` check before state
  // flips. The ref is set synchronously and blocks re-entry the same tick.
  const inFlightRef = useRef(false);
  // Guards the programmatic native `submit` dispatch (fired once on real
  // success so the MEGA optimizer records its conversion) so the form's
  // onSubmit handler cannot re-enter performSubmit.
  const dispatchingNativeRef = useRef(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [homeowner, setHomeowner] = useState<HomeownerValue | "">("");
  const [factor, setFactor] = useState<FactorValue | "">("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length === 10;
  const canSubmit =
    firstName.trim().length >= 1 &&
    lastName.trim().length >= 1 &&
    /@.+\./.test(email) &&
    phoneValid &&
    homeowner.length > 0 &&
    factor.length > 0;

  // Single tracking call site — invoked ONLY after res?.ok === true, so a
  // dropped lead fires zero conversions. Fields are passed as separate keys so
  // they land as separate columns in Mega Events / Keystone (Peter mandate
  // 2026-05-14).
  function fireTracking(
    h: HomeownerValue,
    f: FactorValue,
    qualified: boolean,
    reason: string | undefined,
  ): void {
    if (typeof window !== "undefined" && window.MegaTag?.trackEvent) {
      try {
        window.MegaTag.trackEvent("form_submit", {
          element: `form-${idSuffix}`,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phoneDigits,
          homeowner: h,
          factor: f,
          qualified,
          disqualification_reason: qualified ? "" : reason ?? "",
        });
      } catch (trackErr) {
        console.warn("MegaTag.trackEvent failed:", trackErr);
      }
    }

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submission",
        form_id: `form-${idSuffix}`,
        qualified,
      });
      // Fire qualified_lead conversion event ONLY for qualified leads —
      // Google Ads conversion is wired to this event in GTM.
      if (qualified) {
        window.dataLayer.push({
          event: "qualified_lead",
          form_id: `form-${idSuffix}`,
        });
      }
    }

    // The MEGA optimizer records its own conversion off a native submit event.
    // Because the submit button is type="button" and calls performSubmit
    // directly, that event never fires on its own, so dispatch it exactly once
    // here — only on a real success. The guard stops the onSubmit handler from
    // re-entering this path.
    if (formRef.current && !dispatchingNativeRef.current) {
      dispatchingNativeRef.current = true;
      try {
        formRef.current.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        );
      } finally {
        dispatchingNativeRef.current = false;
      }
    }
  }

  async function performSubmit() {
    if (inFlightRef.current || submitted) return;
    if (!canSubmit) return;
    inFlightRef.current = true;
    setError(null);
    setSubmitting(true);

    const h = homeowner as HomeownerValue;
    const f = factor as FactorValue;
    const { qualified, reason } = isQualifiedLead(h, f);

    const formData: Record<string, unknown> = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phoneDigits,
      homeowner: h,
      factor: f,
      qualified,
      disqualification_reason: qualified ? undefined : reason,
    };

    try {
      const res = await submit(formData);
      // Only a real save flips to the success card and fires conversions.
      // HTTP errors, network drops, and any 2xx body that is not { ok: true }
      // fall through to the retryable error state below.
      if (res?.ok === true) {
        fireTracking(h, f, qualified, reason);
        setSubmitted(true);
      } else {
        setError(SUBMIT_ERROR_MESSAGE);
      }
    } catch (err) {
      // Network drop or malformed response — a failed submit, not a success:
      // keep the form retryable and fire nothing.
      console.error("Form submission failed:", err);
      setError(SUBMIT_ERROR_MESSAGE);
    } finally {
      setSubmitting(false);
      // Clear the in-flight latch so a failed submit is retryable — on success
      // the form unmounts anyway; on failure this is what lets a second click
      // produce a second network call.
      inFlightRef.current = false;
    }
  }

  // Keep onSubmit inert: it only cancels the browser's default navigation so
  // an Enter-in-a-field (or the programmatic dispatch above) cannot bypass the
  // validate-first gate. All real submission goes through performSubmit.
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  // Enter-to-submit: the button no longer triggers a native submit, so route
  // Enter (outside a textarea) through the same validate-first path.
  function handleFormKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key !== "Enter") return;
    if ((e.target as HTMLElement).tagName === "TEXTAREA") return;
    e.preventDefault();
    handleButtonClick();
  }

  // Validate-first pattern — button is type="button" and calls performSubmit
  // directly (no native submit event) so the Mega optimizer cannot fire
  // form_submit before validation or before the fetch resolves.
  function handleButtonClick() {
    // Synchronous re-entry guard — blocks rapid double/triple clicks before
    // React's submitting state flips.
    if (inFlightRef.current || submitted) return;
    if (!canSubmit) {
      formRef.current?.reportValidity();
      return;
    }
    performSubmit();
  }

  const wrapperClass =
    variant === "hero"
      ? "bg-white/97 backdrop-blur rounded-2xl shadow-2xl shadow-[var(--color-accent)]/40 border border-white/40 p-6 sm:p-7"
      : variant === "inline"
      ? "bg-[var(--color-surface-alt)] rounded-2xl border border-[var(--color-line)] p-6 sm:p-8"
      : "bg-white rounded-2xl shadow-xl border border-[var(--color-line)] p-6 sm:p-8";

  const inputClass =
    "w-full rounded-lg border border-[var(--color-line)] bg-white px-4 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition";

  if (submitted) {
    return (
      <div className={wrapperClass}>
        <div className="text-center py-6 space-y-4">
          <div className="mx-auto w-14 h-14 rounded-full bg-[var(--color-wood-100)] flex items-center justify-center">
            <svg
              className="w-7 h-7 text-[var(--color-wood)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-[var(--color-accent)]">
            Thank you, {firstName || "we"}&apos;re on it.
          </h3>
          <p className="text-[var(--color-ink-muted)] max-w-sm mx-auto">
            We&apos;ll be in touch within 24 hours to schedule your on-site
            assessment. For anything urgent, call us at{" "}
            <a
              href={BRAND.phoneHref}
              className="text-[var(--color-primary)] font-semibold underline"
            >
              {BRAND.phone}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-accent)] leading-tight">
          {heading}
        </h3>
        {subheading && (
          <p className="text-sm text-[var(--color-ink-muted)] mt-2">
            {subheading}
          </p>
        )}
      </div>

      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        onKeyDown={handleFormKeyDown}
        noValidate={false}
        className="space-y-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor={`fn-${idSuffix}`} className="sr-only">
              First name
            </label>
            <input
              id={`fn-${idSuffix}`}
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`ln-${idSuffix}`} className="sr-only">
              Last name
            </label>
            <input
              id={`ln-${idSuffix}`}
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`email-${idSuffix}`} className="sr-only">
            Email
          </label>
          <input
            id={`email-${idSuffix}`}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`phone-${idSuffix}`} className="sr-only">
            Phone number
          </label>
          <input
            id={`phone-${idSuffix}`}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            required
            pattern="\(\d{3}\) \d{3}-\d{4}"
            title="Enter a 10-digit US phone number"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor={`homeowner-${idSuffix}`}
            className="block text-xs font-semibold text-[var(--color-ink)] mb-1.5 uppercase tracking-wider"
          >
            Are you the homeowner or property manager?
          </label>
          <div className="relative">
            <select
              id={`homeowner-${idSuffix}`}
              name="homeowner"
              required
              value={homeowner}
              onChange={(e) => setHomeowner(e.target.value as HomeownerValue)}
              className={`${inputClass} appearance-none pr-10 ${
                homeowner === "" ? "text-[var(--color-ink-muted)]" : ""
              }`}
            >
              <option value="" disabled>
                Select one
              </option>
              {HOMEOWNER_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="text-[var(--color-ink)]"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor={`factor-${idSuffix}`}
            className="block text-xs font-semibold text-[var(--color-ink)] mb-1.5 uppercase tracking-wider"
          >
            What matters most to you when hiring a contractor?
          </label>
          <div className="relative">
            <select
              id={`factor-${idSuffix}`}
              name="factor"
              required
              value={factor}
              onChange={(e) => setFactor(e.target.value as FactorValue)}
              className={`${inputClass} appearance-none pr-10 ${
                factor === "" ? "text-[var(--color-ink-muted)]" : ""
              }`}
            >
              <option value="" disabled>
                Select one
              </option>
              {FACTOR_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="text-[var(--color-ink)]"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown />
            </div>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            aria-live="polite"
            className="!mt-0 rounded-lg border border-red-300 bg-[#fef3f2] px-3.5 py-2.5 text-sm font-semibold !text-[#b91c1c]"
          >
            {error}
          </p>
        )}

        {/* type="button" + validate-first pattern: onClick calls performSubmit
            directly (no native submit event) so the Mega optimizer never fires
            a duplicate form_submit before validation or before fetch resolves. */}
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={submitting || submitted}
          className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-700)] hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary-700)] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-lg font-bold text-base transition shadow-lg shadow-[var(--color-primary)]/30 mt-2 group relative overflow-hidden btn-glow"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {submitting ? "Submitting…" : BRAND.primaryCtaLabel}
            {!submitting && (
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
          </span>
        </button>

        <p className="text-[11px] text-[var(--color-ink-muted)] text-center leading-relaxed pt-1">
          {BRAND.ctaSubLabel}. By submitting, you agree to be contacted by{" "}
          {BRAND.name} about your project.
        </p>
      </form>
    </div>
  );
}
