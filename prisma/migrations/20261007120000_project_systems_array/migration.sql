-- ProjectPage.system (single value) → ProjectPage.systems (list).
-- Written by hand so existing values are carried over instead of dropped.

-- AlterTable
ALTER TABLE "ProjectPage" ADD COLUMN "systems" TEXT[];

-- Carry over any existing single value
UPDATE "ProjectPage" SET "systems" = ARRAY["system"] WHERE "system" IS NOT NULL;

-- AlterTable
ALTER TABLE "ProjectPage" DROP COLUMN "system";
