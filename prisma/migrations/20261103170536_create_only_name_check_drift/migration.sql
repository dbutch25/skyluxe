-- CreateTable
CREATE TABLE "NavMenu" (
    "id" TEXT NOT NULL,
    "services" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NavMenu_pkey" PRIMARY KEY ("id")
);
