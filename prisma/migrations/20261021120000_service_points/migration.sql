-- AlterTable
ALTER TABLE "ServiceCarousel" ADD COLUMN     "points" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Backfill: copy the bullet points that were hardcoded in ServicesGrid.tsx so
-- the homepage looks the same after deploying. Only rows with no points yet.
UPDATE "ServiceCarousel" SET "points" = ARRAY['SBS, TPO, EPDM & BUR systems', 'New construction & reroof replacement', 'GAF Master Elite certified', 'Project management from assessment to handover']
  WHERE "category" = 'ICI-roofing' AND cardinality("points") = 0;
UPDATE "ServiceCarousel" SET "points" = ARRAY['Architectural shingles, slate & metal', 'GAF Golden Pledge warranty available', 'Custom flat roof systems', 'Full site cleanup & final walkthrough']
  WHERE "category" = 'residential-roofing' AND cardinality("points") = 0;
UPDATE "ServiceCarousel" SET "points" = ARRAY['ACM composite panels & standing seam', 'Zinc, copper & custom metal facades', 'Rainscreen & concealed fastener systems', 'Works directly with architects & GCs']
  WHERE "category" = 'architectural-cladding' AND cardinality("points") = 0;
UPDATE "ServiceCarousel" SET "points" = ARRAY['Below-grade foundation systems', 'Plaza decks & parkade coatings', 'Building envelope restoration', 'Blindside waterproofing specialists']
  WHERE "category" = 'waterproofing' AND cardinality("points") = 0;
UPDATE "ServiceCarousel" SET "points" = ARRAY['24/7 emergency leak response', 'Infrared moisture detection', 'All major roofing systems serviced', 'Semi-annual preventative programs']
  WHERE "category" = 'repairs' AND cardinality("points") = 0;
UPDATE "ServiceCarousel" SET "points" = ARRAY['Masonry repair & repointing', 'Caulking & sealant replacement', 'Facade cleaning & coating systems', 'Heritage & modern buildings']
  WHERE "category" = 'restoration' AND cardinality("points") = 0;
