/*
  Warnings:

  - A unique constraint covering the columns `[slugUrl]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "News_slugUrl_key" ON "News"("slugUrl");
