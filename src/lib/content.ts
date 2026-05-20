// Gulf2Bay Softwash LP — source of truth for all page content.
// Atlas task: aa76a8ad-9749-4ea3-b28c-dfd295378eb8
// Customer: Gulf2Bay Softwash (8cd09b64-b330-4e68-9607-40033f1fed9f)
//
// Positioning (task internal_notes 2026-05-08):
//   "Gulf2Bay is a certified exterior RESTORER, not a pressure washer.
//    Feature Panofam certification. Specialty in cedar siding and Brazilian
//    hardwood (ipe, mahogany, garappa, cherry) deck restoration. Premium tone
//    for Hamptons/Gold Coast homeowner audience."
//
// Phone: CTM dynamic-swap number; static fallback routes to 631-894-6751.

export type FAQ = {
  question: string;
  answer: string;
};

export type Testimonial = {
  name: string;
  org: string;
  quote: string;
};

export type Service = {
  slug: string;
  anchorId: string;
  label: string;
  heading: string;
  body: string;
  image: string;
  outcomes: string[];
};

export const BRAND = {
  name: "Gulf2Bay Softwash",
  fullName: "Gulf2Bay Softwash & Restoration",
  tagline: "Long Island's certified exterior restorers.",
  positioning:
    "Gulf2Bay isn't a pressure washing company. We're a certified exterior restoration team specializing in cedar siding, Brazilian hardwood decks, and gentle soft washing for the most demanding estate properties on Long Island — from the Hamptons to the Gold Coast.",
  shortPositioning:
    "Cedar restoration · Brazilian hardwood deck care · Soft washing · Roof, paver, and concrete restoration.",
  // CTM dynamic-swap number replaces this at runtime; the static fallback
  // is the customer's owner line per task spec.
  phone: "(631) 894-6751",
  phoneHref: "tel:6318946751",
  phoneRaw: "631-894-6751",
  email: "service@gulf2baysoftwash.com",
  address: {
    region: "Suffolk & Nassau Counties, Long Island",
    serviceArea: "Hamptons · North Shore · Gold Coast · Greater Long Island",
  },
  primaryCtaLabel: "Get My Free Restoration Estimate",
  primaryCtaShort: "Get My Free Estimate",
  ctaSubLabel: "No-obligation on-site assessment · 24-hr response",
} as const;

// Rotating words used in the animated hero headline.
export const HERO_ROTATING_WORDS = [
  "cedar siding",
  "Brazilian hardwood decks",
  "natural stone & pavers",
  "soft-washed exteriors",
  "ipe & mahogany",
] as const;

export const STATS: { value: string; label: string; suffix?: string }[] = [
  { value: "15", label: "Years restoring Long Island estates", suffix: "+" },
  { value: "100", label: "% Panofam-certified soft-wash methodology", suffix: "%" },
  { value: "5", label: "Brazilian hardwoods we restore (ipe, mahogany, garappa, cherry, teak)" },
  { value: "24", label: "Hour response on every estimate request", suffix: "h" },
];

export const TRUST_BADGES = [
  "Panofam Certified Applicator",
  "Trident Eco-Friendly Products",
  "Joint-Stabilizing Sealant Specialist",
  "Cedar & Brazilian Hardwood Authority",
  "Hamptons · Gold Coast · North Shore",
];

export const SERVICES: Service[] = [
  {
    slug: "cedar-siding-restoration",
    anchorId: "cedar-siding",
    label: "Cedar siding restoration",
    heading: "Cedar siding restoration that brings the wood back to life",
    body: "Aged cedar shakes and shingles develop deep gray patina, embedded mildew, and surface checking that pressure washing only makes worse. Our restoration process uses Panofam's gentle reagents to lift biological growth and oxidation, neutralize tannin bleed, then re-saturate the wood with breathable, marine-grade finishes designed for the Long Island coastal climate. The result is the warm, original cedar color, sealed to weather the next decade.",
    image: "/images/cedar-restoration-1.jpg",
    outcomes: [
      "Lifts gray patina & embedded mildew",
      "Restores original cedar tone",
      "Marine-grade finish for coastal homes",
    ],
  },
  {
    slug: "brazilian-hardwood-deck-restoration",
    anchorId: "brazilian-hardwood",
    label: "Brazilian hardwood decks",
    heading: "Ipe, mahogany, garappa & cherry — restored the way the wood demands",
    body: "Brazilian hardwoods are not standard decking. Ipe, mahogany, garappa, and Brazilian cherry are dense, oil-rich species that reject conventional sealers and crack under careless pressure. Our protocol cleans with biodegradable strippers calibrated for tropical hardwoods, neutralizes the surface pH, and finishes with penetrating oils made for these woods specifically. We're one of the few crews on Long Island that knows how to keep ipe looking like ipe.",
    image: "/images/deckrestoration.jpg",
    outcomes: [
      "Specific to ipe, mahogany, garappa, Brazilian cherry",
      "Penetrating oil finishes (no peeling)",
      "Restores rich amber & chocolate tones",
    ],
  },
  {
    slug: "soft-wash-house-washing",
    anchorId: "soft-washing",
    label: "Soft washing & house washing",
    heading: "Gentle soft washing for siding, stone, stucco, and more",
    body: "High-pressure washing damages painted siding, drives water behind cladding, and shreds soft mortar. Soft washing uses low-pressure application of biodegradable cleaning solutions that kill mildew, algae, and lichen at the source. We use Trident's eco-safe line for any surface near plantings and waterfront. Approved for cedar, Hardie, stucco, painted shingles, brick, and natural stone exteriors.",
    image: "/images/homepage-left.jpg",
    outcomes: [
      "Safe for paint, stucco, soft mortar, plantings",
      "Kills mildew at the root (not just rinses)",
      "Trident eco-friendly products near waterfront",
    ],
  },
  {
    slug: "roof-cleaning",
    anchorId: "roof-cleaning",
    label: "Roof cleaning",
    heading: "Restore your roof without stripping the granules",
    body: "The black streaks on asphalt shingles are gloeocapsa magma — a hardy algae that feeds on the limestone filler in the shingles themselves. Pressure washing accelerates roof failure. Our certified soft-wash roof cleaning kills the colony at the root and adds years of protection without lifting a single granule. Approved by major shingle manufacturers as the only acceptable cleaning method.",
    image: "/images/roof-cleaning.jpg",
    outcomes: [
      "ARMA-approved soft-wash method",
      "Kills algae at the root",
      "Adds years of shingle life",
    ],
  },
  {
    slug: "paver-natural-stone-restoration",
    anchorId: "paver-stone",
    label: "Pavers & natural stone",
    heading: "Paver and stone restoration with joint stabilization",
    body: "Brick, bluestone, and natural-stone patios lose their joint sand to wind, ice, and routine traffic — once the joints are gone, weeds and frost take over and the whole installation starts shifting. We deep-clean the surface, replace polymeric or stabilizing sand in the joints, and seal everything in matte or enhanced finishes that lock the installation in place for years.",
    image: "/images/G2B-Paver-Photos2.jpg",
    outcomes: [
      "Polymeric sand re-jointing",
      "Joint-stabilizing sealer locks in pavers",
      "Matte or wet-look finishes",
    ],
  },
  {
    slug: "concrete-driveways-walkways",
    anchorId: "concrete",
    label: "Concrete & driveways",
    heading: "Concrete and driveway restoration",
    body: "Oil stains, rust runs, organic growth, and salt damage age a driveway long before the concrete fails. Our concrete restoration combines hot-water surface cleaning with targeted chemical treatments for embedded staining, then a clear penetrating sealer that locks out moisture and salt for the next 3-5 years.",
    image: "/images/concrete-cleaning-mainimg-1024x576.jpg",
    outcomes: [
      "Lifts oil, rust, and salt damage",
      "Hot-water surface cleaning",
      "3-5 year penetrating sealer",
    ],
  },
];

export const WHY_US: { title: string; body: string }[] = [
  {
    title: "Certified, not improvised",
    body: "Panofam-certified applicator. Trident-approved eco-friendly product line. Continuing-education trained on restoration chemistry, not just pressure-washer operation. Most exterior cleaners on Long Island are not certified in any of these.",
  },
  {
    title: "Specialty woods are our specialty",
    body: "Cedar and Brazilian hardwoods (ipe, mahogany, garappa, cherry) reject the products most crews use. We're trained on tropical-hardwood restoration specifically — the same finishes used on commercial boardwalks and yacht decking.",
  },
  {
    title: "Built for estate-grade properties",
    body: "Insurance, paperwork, scheduling, and on-site behavior calibrated for Hamptons and Gold Coast properties — including white-glove coordination with property managers, landscape architects, and household staff.",
  },
  {
    title: "Eco-conscious by default",
    body: "We use Trident's biodegradable line as our standard, not a premium upgrade. Safe for plantings, pools, koi ponds, and shoreline. Required on most waterfront properties — and the right call on every other property too.",
  },
];

export const PROCESS_STEPS: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "On-site assessment",
    body: "We come to you, walk the property, identify wood species, current condition, and the right restoration protocol. Most companies skip this — and that's why most restorations fail in two seasons.",
  },
  {
    step: "02",
    title: "Detailed written estimate",
    body: "You get a written scope: surfaces, products, technique, and timeline. No upsells on the day-of, no surprise add-ons.",
  },
  {
    step: "03",
    title: "Restoration",
    body: "Our certified crew executes the protocol — careful surface prep, biodegradable cleaning, then the appropriate finish for the species and exposure. Plantings and surfaces are protected throughout.",
  },
  {
    step: "04",
    title: "Walkthrough & maintenance plan",
    body: "We walk the finished work with you. You get a written care plan and a recommended re-coat / refresh interval — not a sales pitch.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  // NOTE: Intentionally empty. Gulf2Bay's live site does not publish any
  // text reviews / testimonials that we can verify, so the LP omits the
  // testimonials section entirely rather than fabricate copy. If/when the
  // customer supplies a list of approved testimonials (with names, towns,
  // and consent), populate this array and the section will render again.
];

export const FAQS: FAQ[] = [
  {
    question: "What makes Gulf2Bay different from a pressure washing company?",
    answer:
      "Pressure washing is one technique among many — and the wrong one for most premium surfaces. We're a certified exterior restoration company. That means we choose the right method for the surface (soft wash, hot water, low-pressure rinse, hand application, specialty chemistry), not the only method we own. For cedar siding, Brazilian hardwoods, painted shingles, soft mortar, and natural stone, pressure washing causes more damage than it fixes.",
  },
  {
    question: "Are you really certified, or is that marketing language?",
    answer:
      "We're a Panofam-certified applicator. Panofam is the leading manufacturer of biodegradable exterior cleaning systems used by certified restoration crews across the country. Our team completes their continuing-education program and we use their full chemical line. Most Long Island exterior cleaners are not certified by any manufacturer.",
  },
  {
    question: "Do you really know Brazilian hardwoods (ipe, mahogany, garappa)?",
    answer:
      "Yes — they're a core specialty. Brazilian hardwoods are dense, oil-rich, and reject conventional sealers. They require species-specific cleaners, neutralizers, and penetrating oils designed for tropical hardwoods. We carry the products and we have the experience: ipe decks, mahogany porches, garappa siding, and Brazilian cherry stair treads have all been restored by our crew across Long Island.",
  },
  {
    question: "Are the products safe for plantings, pools, koi ponds, and waterfront?",
    answer:
      "Yes — that's the default, not a premium option. Our standard cleaning line is Trident's eco-friendly biodegradable product line. We pre-rinse plantings, set up containment as needed, and select products rated safe for ponds and shoreline. Required on waterfront properties; the right call on every other property too.",
  },
  {
    question: "How quickly can you come out for an estimate?",
    answer:
      "We respond to every inquiry within 24 hours. On-site assessments are typically scheduled within 3-5 business days depending on the season. Restoration work is usually booked 2-4 weeks out — sooner for emergencies (e.g., closing-related deadlines or storm damage).",
  },
  {
    question: "What areas of Long Island do you serve?",
    answer:
      "We cover Suffolk and Nassau Counties — including the full Hamptons, North Shore, and Gold Coast estate corridors. If you're east of the Cross Island Parkway, we serve you. Call or submit the form for an estimate on commercial properties or projects outside the standard footprint.",
  },
  {
    question: "Will the phone number on this page reach Gulf2Bay directly?",
    answer:
      "Yes. The number on this page is a tracking line that routes directly to our office at 631-894-6751. We use the tracking number so we can measure how well this ad campaign is working — every call rings through to the same crew you'd reach by calling the main line.",
  },
];

// Form options — qualifying-question values per task spec.
export const HOMEOWNER_OPTIONS = [
  { value: "homeowner", label: "Homeowner" },
  { value: "property_manager", label: "Property manager" },
  { value: "not_either", label: "Neither — I'm not the decision maker" },
] as const;

export const FACTOR_OPTIONS = [
  { value: "quality", label: "Quality of work & longevity" },
  { value: "price", label: "Price / lowest quote" },
] as const;

export type HomeownerValue = (typeof HOMEOWNER_OPTIONS)[number]["value"];
export type FactorValue = (typeof FACTOR_OPTIONS)[number]["value"];

// Qualified-lead logic (per task spec):
//   - Homeowner OR Property Manager = qualified (on Q1)
//   - "Not either" = disqualified (Q1)
//   - Quality = qualified (Q2)
//   - Price = disqualified (Q2)
// BOTH qualifying answers must pass for the lead to count as "qualified."
export function isQualifiedLead(
  homeowner: HomeownerValue | "",
  factor: FactorValue | "",
): { qualified: boolean; reason?: string } {
  if (!homeowner || !factor) return { qualified: false, reason: "incomplete" };
  if (homeowner === "not_either") {
    return { qualified: false, reason: "not_decision_maker" };
  }
  if (factor === "price") {
    return { qualified: false, reason: "price_sensitive" };
  }
  return { qualified: true };
}
