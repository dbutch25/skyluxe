/**
 * Option lists for project fields. Admin forms, Zod validation, the document
 * import and the public /projects filters all read from here, so a value only
 * has to be added in one place.
 *
 * Kept free of other imports so public pages can use it without pulling in Zod.
 */

export const PROJECT_CATEGORIES = [
  "ICI",
  "architectural cladding",
  "residential roofing",
  "waterproofing",
  "restoration",
] as const;

export const PROJECT_SERVICES = [
  "ICI Roofing",
  "Residential Roofing",
  "Architectural Cladding",
  "Waterproofing",
  "Restoration",
] as const;

export const PROJECT_SECTORS = ["ICI", "Residential"] as const;

export const PROJECT_SYSTEMS = [
  "TPO",
  "SBS",
  "EPDM",
  "ACM",
  "Standing Seam",
  "Hot Rubber",
] as const;
