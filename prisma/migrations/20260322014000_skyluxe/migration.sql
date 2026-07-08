-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeVideo" (
    "id" TEXT NOT NULL,
    "videoLabel" TEXT,
    "videoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutUsHome" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutUsHome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeGallery" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeGallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceCarousel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "serviceLink" TEXT NOT NULL,
    "requestLink" TEXT NOT NULL,
    "mainImageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceCarousel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectPage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "backgroundVideoUrl" TEXT,
    "fallbackImageUrl" TEXT,
    "content" TEXT,
    "mainImageUrl" TEXT,
    "listSections" JSONB,
    "extraContent" TEXT,
    "extraImageUrl" TEXT,
    "fullWidthImageUrl" TEXT,
    "centeredText" TEXT,
    "images" TEXT[],
    "carouselImages" TEXT[],
    "firstEmbed" TEXT,
    "secondEmbed" TEXT,
    "thirdEmbed" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repairs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "firstContent" TEXT,
    "secondContent" TEXT,
    "firstImageUrl" TEXT,
    "firstImageAlt" TEXT,
    "thirdContent" TEXT,
    "images" JSONB,
    "listSections" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Repairs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waterproofing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "accordionItems" JSONB,
    "gallery" JSONB,
    "manufacturersGallery" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Waterproofing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ICIRoofing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "firstTitle" TEXT,
    "firstContent" TEXT,
    "firstImageUrl" TEXT,
    "firstImageAlt" TEXT,
    "secondImageUrl" TEXT,
    "secondImageAlt" TEXT,
    "secondContent" TEXT,
    "thirdContent" TEXT,
    "secondTitle" TEXT,
    "listSections" JSONB,
    "listItem" TEXT,
    "galleryImages" JSONB,
    "extraTitle" TEXT,
    "carouselMImages" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ICIRoofing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cladding" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "listSections" JSONB,
    "galleryImages" JSONB,
    "extraTitle" TEXT,
    "extraContent" TEXT,
    "carouselMImages" JSONB,
    "carouselADImages" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cladding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Residential" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "backgroundImageUrl" TEXT,
    "backgroundImageAlt" TEXT,
    "residentialList" JSONB,
    "firstTitle" TEXT,
    "firstContent" TEXT,
    "firstImageUrl" TEXT,
    "firstImageAlt" TEXT,
    "secondImageUrl" TEXT,
    "secondImageAlt" TEXT,
    "residentialImages" TEXT[],
    "asphaltTitle" TEXT,
    "asphaltFirstContent" TEXT,
    "asphaltImageUrl" TEXT,
    "asphaltImageAlt" TEXT,
    "asphaltImages" TEXT[],
    "cedarTitle" TEXT,
    "cedarFirstContent" TEXT,
    "cedarFirstImageUrl" TEXT,
    "cedarFirstImageAlt" TEXT,
    "cedarSecondImageUrl" TEXT,
    "cedarSecondImageAlt" TEXT,
    "cedarImages" TEXT[],
    "metalsTitle" TEXT,
    "metalsList" JSONB,
    "metalsContent" TEXT,
    "metalsFirstImageUrl" TEXT,
    "metalsFirstImageAlt" TEXT,
    "metalsImages" TEXT[],
    "guttersTitle" TEXT,
    "guttersContent" TEXT,
    "guttersFirstImageUrl" TEXT,
    "guttersFirstImageAlt" TEXT,
    "guttersSecondImageUrl" TEXT,
    "guttersSecondImageAlt" TEXT,
    "guttersImages" TEXT[],
    "naturalTitle" TEXT,
    "naturalContent" TEXT,
    "naturalImages" TEXT[],
    "syntheticTitle" TEXT,
    "syntheticContent" TEXT,
    "syntheticImageUrl" TEXT,
    "syntheticImageAlt" TEXT,
    "syntheticImages" TEXT[],
    "skylightTitle" TEXT,
    "skylightContent" TEXT,
    "carouselMImages" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Residential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imgUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "applyUrl" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "HomeGallery_slug_key" ON "HomeGallery"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectPage_slug_key" ON "ProjectPage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectPage_projectId_key" ON "ProjectPage"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPage" ADD CONSTRAINT "ProjectPage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
