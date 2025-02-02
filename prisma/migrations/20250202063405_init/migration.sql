-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "fontIcon" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "fontIcon" TEXT,

    CONSTRAINT "JobRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolsOnJobRoles" (
    "toolId" INTEGER NOT NULL,
    "jobRoleId" INTEGER NOT NULL,

    CONSTRAINT "ToolsOnJobRoles_pkey" PRIMARY KEY ("toolId","jobRoleId")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "pricing" TEXT NOT NULL,
    "tags" TEXT[],
    "hasFreePrice" BOOLEAN,
    "hasPaidPrice" BOOLEAN,
    "paidPrice" TEXT,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureProject" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "FeatureProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutorial" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tags" TEXT[],
    "videoId" TEXT,
    "viewCount" TEXT,
    "likeCount" TEXT,

    CONSTRAINT "Tutorial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" TEXT,
    "slugUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutorialKeyword" (
    "id" SERIAL NOT NULL,
    "keyword" TEXT,

    CONSTRAINT "tutorialKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsKeyword" (
    "id" SERIAL NOT NULL,
    "keyword" TEXT NOT NULL,
    "keywordUrl" TEXT NOT NULL,

    CONSTRAINT "newsKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolsOnCategories" (
    "toolId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "ToolsOnCategories_pkey" PRIMARY KEY ("toolId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "JobRole_name_key" ON "JobRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JobRole_slug_key" ON "JobRole"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureProject_title_key" ON "FeatureProject"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Tutorial_url_key" ON "Tutorial"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Tutorial_videoId_key" ON "Tutorial"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "News_slugUrl_key" ON "News"("slugUrl");

-- AddForeignKey
ALTER TABLE "ToolsOnJobRoles" ADD CONSTRAINT "ToolsOnJobRoles_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsOnJobRoles" ADD CONSTRAINT "ToolsOnJobRoles_jobRoleId_fkey" FOREIGN KEY ("jobRoleId") REFERENCES "JobRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsOnCategories" ADD CONSTRAINT "ToolsOnCategories_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsOnCategories" ADD CONSTRAINT "ToolsOnCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
