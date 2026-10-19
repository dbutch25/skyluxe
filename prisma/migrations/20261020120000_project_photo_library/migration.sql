-- AlterTable
-- Project photo library. IF NOT EXISTS keeps this safe if the columns were
-- already added to the live database with `prisma db push`.
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS "skipPhotos" TEXT[] DEFAULT ARRAY[]::TEXT[];