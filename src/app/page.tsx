"use client";

import Image from "next/image";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FormCard } from "@/components/FormCard";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Reveal } from "@/components/Reveal";
import { RotatingWords } from "@/components/RotatingWords";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  BRAND,
  HERO_ROTATING_WORDS,
  STATS,
  TRUST_BADGES,
  SERVICES,
  WHY_US,
  PROCESS_STEPS,
  TESTIMONIALS,
  FAQS,
} from "@/lib/content";

function DualCTA({
  variant = "light",
  formLabel,
}: {
  variant?: "light" | "dark";
  formLabel?: string;
}) {
  const isDark = variant === "dark";
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      <a
        href="#contact"
        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-7 py-3.5 rounded-lg font-semibold text-base transition shadow-md btn-glow"
      >
        {formLabel ?? BRAND.primaryCtaShort}
      </a>
      <a
        href={BRAND.phoneHref}
        className={`border-2 ${
          isDark
            ? "border-white/70 text-white hover:bg-white/10"
            : "border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
        } px-6 py-3 rounded-lg font-semibold text-base transition inline-flex items-center gap-2`}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
        Or call {BRAND.phone}
      </a>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate hero-bg pt-28 sm:pt-32 pb-16 sm:pb-24 lg:pb-32 overflow-hidden"
    >
      {/* Hero photo + dark gradient is applied via .hero-bg::before */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-center">
          <Reveal>
            <span className="eyebrow eyebrow-on-dark">
              Panofam-certified · Long Island
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight">
              We don&apos;t pressure wash.
              <br />
              We <span className="emphasis-wood">restore</span>{" "}
              <RotatingWords
                words={HERO_ROTATING_WORDS}
                widthCh={22}
                className="font-extrabold"
              />
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-white/85 leading-relaxed max-w-xl">
              Long Island&apos;s certified exterior restoration specialists.
              Cedar siding, Brazilian hardwood decks, soft-washed estates,
              roof &amp; paver restoration. Built for the Hamptons, North
              Shore, and Gold Coast.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {TRUST_BADGES.slice(0, 3).map((b) => (
                <span
                  key={b}
                  className="text-xs sm:text-sm font-medium text-white/90 bg-white/10 backdrop-blur border border-white/20 rounded-full px-3 py-1"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="bg-[var(--color-wood)] hover:bg-[var(--color-wood-hover)] text-white px-7 py-3.5 rounded-lg font-bold text-base sm:text-lg transition shadow-lg shadow-[var(--color-wood)]/30 btn-glow"
              >
                {BRAND.primaryCtaLabel}
              </a>
              <a
                href={BRAND.phoneHref}
                className="border-2 border-white/70 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold text-base transition inline-flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
                <span>Or call {BRAND.phone}</span>
              </a>
            </div>

            <p className="mt-3 text-xs text-white/55">
              The number above is a tracking line that rings through to our
              office. {BRAND.ctaSubLabel}.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <FormCard variant="hero" idSuffix="hero" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section
      id="stats"
      className="relative bg-white py-14 sm:py-20 border-y border-[var(--color-line)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Why Long Island estate owners choose us</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[var(--color-accent)]">
              Certified, not improvised.
            </h2>
            <p className="mt-3 text-base text-[var(--color-ink-muted)]">
              We&apos;re a restoration company that happens to wash. Not the
              other way around.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((s, i) => {
            const numericMatch = s.value.match(/^(\d+)/);
            const num = numericMatch ? parseInt(numericMatch[1], 10) : null;
            return (
              <Reveal key={s.label} delay={i * 60}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary)] tracking-tight">
                    {num !== null ? (
                      <AnimatedCounter
                        to={num}
                        suffix={s.suffix ?? ""}
                        display={s.value + (s.suffix ?? "")}
                      />
                    ) : (
                      <>
                        {s.value}
                        {s.suffix ?? ""}
                      </>
                    )}
                  </div>
                  <p className="mt-2 text-sm sm:text-base text-[var(--color-ink-muted)] leading-snug">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServicesOverviewSection() {
  return (
    <section id="services" className="relative bg-[var(--color-surface-alt)] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">What we restore</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-accent)] leading-tight">
              Six restoration specialties — done the right way.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-muted)]">
              Cedar, Brazilian hardwood, soft washing, roof, paver, and concrete
              restoration. Each one calls for its own protocol. We carry the
              certifications and the products for all of it.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <a
                href={`#${s.anchorId}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-[var(--color-line)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface-alt)]">
                  <Image
                    src={s.image}
                    alt={s.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[var(--color-accent)]">
                    {s.label}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-ink-muted)] line-clamp-3">
                    {s.body.split(". ")[0] + "."}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-2 transition-all">
                    Read more
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <DualCTA />
        </Reveal>
      </div>
    </section>
  );
}

function ServiceDetailSection({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const reverse = index % 2 === 1;
  return (
    <section
      id={service.anchorId}
      className="relative bg-white py-16 sm:py-20 border-t border-[var(--color-line)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <Reveal>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={service.image}
                alt={service.heading}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="eyebrow">{service.label}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[var(--color-accent)] leading-tight">
              {service.heading}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-muted)] leading-relaxed">
              {service.body}
            </p>

            <ul className="mt-6 space-y-2">
              {service.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-3 text-base text-[var(--color-ink)]"
                >
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-wood-100)] flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-[var(--color-wood)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-6 py-3 rounded-lg font-semibold text-base transition shadow-md btn-glow"
              >
                Get an estimate for {service.label.toLowerCase()}
              </a>
              <a
                href={BRAND.phoneHref}
                className="border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 px-5 py-2.5 rounded-lg font-semibold text-base transition"
              >
                Or call {BRAND.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="relative bg-[var(--color-accent)] text-white py-20 sm:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-[var(--color-primary-800)] via-transparent to-[var(--color-wood-800)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow eyebrow-on-dark">Why Gulf2Bay</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              The difference between cleaning a house and{" "}
              <span className="text-[var(--color-wood-300)]">restoring</span>{" "}
              one.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80">
              Anyone can rent a pressure washer. Restoration takes
              certification, the right chemistry, and a crew who actually
              knows the difference between cedar and Brazilian hardwood.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {WHY_US.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div className="relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition">
                <div className="absolute top-7 right-7 text-white/10 text-5xl font-extrabold leading-none">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-white pr-12">
                  {w.title}
                </h3>
                <p className="mt-3 text-white/75 leading-relaxed">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <DualCTA variant="dark" />
        </Reveal>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">The process</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-accent)] leading-tight">
              Four steps. No surprises. No upsells.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-muted)]">
              The first call is an honest conversation, not a sales pitch. We
              come out, identify the right protocol for your property, and
              hand you a written scope you can compare to anyone else&apos;s.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((p, i) => (
            <Reveal key={p.step} delay={i * 80}>
              <div className="relative bg-[var(--color-surface-alt)] rounded-2xl p-6 border border-[var(--color-line)] h-full">
                <div className="text-5xl font-extrabold text-[var(--color-wood)]/30 tracking-tight">
                  {p.step}
                </div>
                <h3 className="mt-3 text-lg font-bold text-[var(--color-accent)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ink-muted)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <DualCTA />
        </Reveal>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-[var(--color-surface-alt)] py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">What estate owners say</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-accent)] leading-tight">
              Trusted on Long Island&apos;s most demanding properties.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <figure className="bg-white rounded-2xl p-7 border border-[var(--color-line)] shadow-sm h-full flex flex-col">
                <svg
                  className="w-8 h-8 text-[var(--color-wood-300)]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7.17 17.5c-1.36 0-2.5-.46-3.41-1.38C2.85 15.21 2.4 14.06 2.4 12.7c0-2.16.79-4.11 2.37-5.83 1.58-1.72 3.4-2.92 5.47-3.59l.96 1.8c-1.21.51-2.27 1.22-3.18 2.14-.91.91-1.5 1.9-1.78 2.96.36-.12.74-.18 1.13-.18 1.16 0 2.13.41 2.92 1.22.79.82 1.18 1.81 1.18 2.99 0 1.18-.42 2.17-1.27 2.97-.85.81-1.85 1.22-3.03 1.22Zm9.6 0c-1.36 0-2.5-.46-3.41-1.38-.91-.91-1.36-2.06-1.36-3.42 0-2.16.79-4.11 2.37-5.83 1.58-1.72 3.4-2.92 5.47-3.59l.96 1.8c-1.21.51-2.27 1.22-3.18 2.14-.91.91-1.5 1.9-1.78 2.96.36-.12.74-.18 1.13-.18 1.16 0 2.13.41 2.92 1.22.79.82 1.18 1.81 1.18 2.99 0 1.18-.42 2.17-1.27 2.97-.85.81-1.85 1.22-3.03 1.22Z" />
                </svg>
                <blockquote className="mt-3 text-base text-[var(--color-ink)] leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <div className="font-semibold text-[var(--color-accent)]">
                    {t.name}
                  </div>
                  <div className="text-[var(--color-ink-muted)]">{t.org}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <DualCTA />
        </Reveal>
      </div>
    </section>
  );
}

function FAQItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={idx * 30}>
      <div className="bg-white rounded-2xl border border-[var(--color-line)] overflow-hidden">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-start justify-between gap-4 text-left px-6 py-5 hover:bg-[var(--color-surface-alt)] transition"
        >
          <span className="text-base sm:text-lg font-semibold text-[var(--color-accent)]">
            {q}
          </span>
          <span
            className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-wood-100)] flex items-center justify-center transition-transform ${
              open ? "rotate-45" : ""
            }`}
          >
            <svg
              className="w-3 h-3 text-[var(--color-wood)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
        </button>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p className="px-6 pb-6 text-base text-[var(--color-ink-muted)] leading-relaxed">
              {a}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Frequently asked</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-accent)] leading-tight">
              Honest answers, before you book.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <FAQItem key={f.question} q={f.question} a={f.answer} idx={i} />
          ))}
        </div>

        <Reveal>
          <DualCTA />
        </Reveal>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-[var(--color-surface-darker)] text-white py-20 sm:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-900)] via-[var(--color-primary-800)]/40 to-[var(--color-wood-800)]/30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">
          <Reveal>
            <span className="eyebrow eyebrow-on-dark">Get your estimate</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Bring your property back to its best.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
              Tell us about your project — siding, decking, roof, pavers, or
              anything else exterior. A certified estimator will be in touch
              within 24 hours to schedule an on-site assessment.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Panofam-certified, eco-friendly methodology",
                "Specialty in cedar & Brazilian hardwood restoration",
                "Estate-grade insurance & coordination",
                "Trident eco-friendly products for waterfront properties",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-base text-white/90"
                >
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-wood)]/30 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-[var(--color-wood-200)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={BRAND.phoneHref}
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-5 py-4 transition group"
              >
                <span className="dot-pulse" aria-hidden />
                <span>
                  <div className="text-xs text-white/60 uppercase tracking-wider font-semibold">
                    Call now
                  </div>
                  <div className="text-lg font-bold tracking-tight">
                    {BRAND.phone}
                  </div>
                </span>
              </a>
              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-4">
                <svg
                  className="w-5 h-5 text-white/70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>
                  <div className="text-xs text-white/60 uppercase tracking-wider font-semibold">
                    Email
                  </div>
                  <div className="text-sm font-semibold">{BRAND.email}</div>
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-white/50 max-w-md">
              Number above is a tracking line that routes directly to our
              office. Serves {BRAND.address.serviceArea}.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <FormCard variant="hero" idSuffix="contact" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function GulfBayLandingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <ServicesOverviewSection />
        {SERVICES.map((s, i) => (
          <ServiceDetailSection key={s.slug} service={s} index={i} />
        ))}
        <WhyUsSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
