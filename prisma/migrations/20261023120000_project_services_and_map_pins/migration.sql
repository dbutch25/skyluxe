-- 1. ProjectPage.service (one value) → ProjectPage.services (list; first = main service).
--    "Repairs & Maintenance" is no longer a project service, so it isn't carried over.

-- AlterTable
ALTER TABLE "ProjectPage" ADD COLUMN "services" TEXT[];

UPDATE "ProjectPage"
SET "services" = ARRAY["service"]
WHERE "service" IS NOT NULL
  AND "service" <> ''
  AND "service" <> 'Repairs & Maintenance';

-- AlterTable
ALTER TABLE "ProjectPage" DROP COLUMN "service";

-- 2. Map pins: projects shown only on the homepage map, without a detail page.
--    Every existing project keeps its detail page.

-- AlterTable
ALTER TABLE "ProjectPage" ADD COLUMN "hasDetailPage" BOOLEAN NOT NULL DEFAULT true;
