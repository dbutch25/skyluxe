/**
 * src/constants/brand.ts
 *
 * Single source of truth for brand stats and credentials.
 * Import from here — never hardcode these values in components.
 */

// Numbers — used in StatsStrip only
export const BRAND_STATS = [
  {
    value: 200,
    suffix: "+",
    label: "Projects Completed",
    sub: "Across the GTA",
  },
  {
    value: 15,
    suffix: "+",
    label: "Years of Experience",
    sub: "In business since 2009",
  },
  {
    value: 10,
    suffix: "yr",
    label: "Workmanship Warranty",
    sub: "Industry-leading coverage",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Emergency Response",
    sub: "Always available",
  },
] as const;

// Credentials — used in HomeCTA trust strip only
export const BRAND_CREDENTIALS = [
  "GAF Master Elite Contractor",
  "Knudson Certified Installer",
  "10-Year Workmanship Warranty",
  "Serving the GTA Since 2009",
] as const;

// Contact info — used anywhere a phone/email is needed
export const BRAND_CONTACT = {
  phone: "(647) 629 5893",
  phoneHref: "tel:+16476295893",
  email: "info@skyluxeroofing.com",
  emailHref: "mailto:info@skyluxeroofing.com",
  address: "1941 Mattawa Ave, Mississauga, ON L4X 1K8",
  mapsHref:
    "https://www.google.com/maps/place/1941+Mattawa+Ave,+Mississauga,+ON,+Canada",
} as const;
