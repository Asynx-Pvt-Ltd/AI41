/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[urlHash]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "normalizedTitle" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "urlHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "News_url_key" ON "News"("url");

-- CreateIndex
CREATE UNIQUE INDEX "News_urlHash_key" ON "News"("urlHash");

-- CreateIndex
CREATE INDEX "News_createdAt_idx" ON "News"("createdAt");

-- CreateIndex
CREATE INDEX "News_normalizedTitle_idx" ON "News"("normalizedTitle");

-- CreateIndex
CREATE INDEX "News_urlHash_idx" ON "News"("urlHash");
