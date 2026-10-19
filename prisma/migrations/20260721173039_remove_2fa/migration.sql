-- CreateTable
CREATE TABLE "Restoration" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "introText" TEXT,
    "heroImageUrl" TEXT,
    "heroImageAlt" TEXT,
    "galleryImages" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restoration_pkey" PRIMARY KEY ("id")
);
