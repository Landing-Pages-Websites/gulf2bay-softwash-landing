"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/content";

/**
 * Gulf2Bay LP header per landing-page-architect Rule #3:
 * logo + phone button + CTA button. No nav menu.
 *
 * Phone is a styled BUTTON (landing-page-builder Rule #9) — never plain text.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur border-b border-[var(--color-line)] shadow-sm"
          : "bg-white/85 backdrop-blur"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link
          href="#hero"
          className="flex items-center gap-2 group"
          aria-label={`${BRAND.name} home`}
        >
          <Image
            src="/images/gulf2bay-logo-textonly.png"
            alt="Gulf2Bay Softwash"
            width={180}
            height={60}
            className="h-8 sm:h-10 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={BRAND.phoneHref}
            className="hidden sm:inline-flex items-center gap-2 border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
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
            <span className="tracking-tight">{BRAND.phone}</span>
          </a>
          <a
            href="#contact"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition shadow-sm"
          >
            {BRAND.primaryCtaShort}
          </a>
        </div>
      </div>
    </header>
  );
}
