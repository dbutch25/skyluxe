-- Flexible project page fields + draft/published flag.

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "chapters" JSONB,
ADD COLUMN     "facts" JSONB,
ADD COLUMN     "highlight" JSONB,
ADD COLUMN     "overview" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "sequenceCaptions" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "underConstruction" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "video" JSONB;

-- AlterTable
ALTER TABLE "ProjectPage" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- Projects that already exist are live on the site, so keep them published.
-- Only projects created from now on start as drafts.
UPDATE "ProjectPage" SET "published" = true;
