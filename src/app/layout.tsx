import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Nunito_Sans } from "next/font/google";
import { QueryParamPersistence } from "@/components/QueryParamPersistence";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

// Tracking IDs — Gulf2Bay Softwash
// Customer ID: 8cd09b64-b330-4e68-9607-40033f1fed9f
// site_tracking row provisioned 2026-05-18; site_url set to book.gulf2baysoftwash.com on deploy.
// GTM: director-supplied 2026-05-20 (task aa76a8ad) — GTM-KBFXTGLJ
// Google-only campaign at launch; no Meta Pixel.
const SITE_ID = "e239fb04-c7d1-4b79-ae03-5bc27f31a77d";
const SITE_KEY = "sk_mpboqjkx_b394xcjneun";
const GTM_ID = "GTM-KBFXTGLJ";

export const metadata: Metadata = {
  metadataBase: new URL("https://book.gulf2baysoftwash.com"),
  title: {
    default:
      "Cedar Siding & Hardwood Deck Restoration on Long Island | Gulf2Bay Softwash",
    template: "%s | Gulf2Bay Softwash",
  },
  description:
    "Long Island's certified exterior restoration specialists. Panofam-certified soft washing, cedar siding restoration, and Brazilian hardwood (ipe, mahogany, garappa, cherry) deck care. Hamptons & Gold Coast estate work. Book your free assessment.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${nunito.variable} h-full antialiased`}
    >
      <head>
        {/* MegaTag — required for form_submit events to land in Mega Events */}
        <meta name="mega-site-id" content={SITE_ID} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.MEGA_TAG_CONFIG={siteKey:"${SITE_KEY}",siteId:"${SITE_ID}",gtmId:"${GTM_ID}"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`,
          }}
        />
        <script
          id="optimizer-script"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          data-site-id={SITE_ID}
          async
        />
        {/* GTM container — Gulf2Bay-specific (director-provided 2026-05-20) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-surface)] text-[var(--color-ink)]">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <QueryParamPersistence />
        {children}
        {/* CallTrackingMetrics — Gulf2Bay swap number on book.gulf2baysoftwash.com */}
        <Script
          src="https://572388.tctm.co/t.js"
          strategy="afterInteractive"
          async
        />
      </body>
    </html>
  );
}
