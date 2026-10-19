-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "area" TEXT,
ADD COLUMN     "blurb" TEXT,
ADD COLUMN     "challenge" TEXT,
ADD COLUMN     "droneDuration" TEXT,
ADD COLUMN     "droneImageUrl" TEXT,
ADD COLUMN     "droneVideoId" TEXT,
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "solution" TEXT;

-- AlterTable
ALTER TABLE "ProjectPage" ADD COLUMN     "sector" TEXT,
ADD COLUMN     "service" TEXT,
ADD COLUMN     "system" TEXT,
ADD COLUMN     "year" INTEGER;
