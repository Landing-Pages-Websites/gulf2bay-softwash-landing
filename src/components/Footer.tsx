import { BRAND } from "@/lib/content";

/**
 * Legal-only footer per landing-page-architect Rule #4.
 * No nav, no social, no outbound links.
 */
export function Footer() {
  return (
    <footer className="bg-[var(--color-accent)] text-[var(--color-ink-on-dark)] py-10 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-3">
        <p className="text-sm text-white/80">
          © {new Date().getFullYear()} {BRAND.fullName} · {BRAND.address.region}
        </p>
        <p className="text-xs text-white/55">
          The phone number on this page is a tracking line that rings through to
          our office at {BRAND.phone}. Panofam-certified exterior restoration ·
          Trident eco-friendly products · Serving the Hamptons, North Shore,
          and Gold Coast. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
