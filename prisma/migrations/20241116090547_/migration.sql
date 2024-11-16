/*
  Warnings:

  - A unique constraint covering the columns `[videoId]` on the table `Tutorial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `videoId` to the `Tutorial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tutorial" ADD COLUMN     "videoId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tutorial_videoId_key" ON "Tutorial"("videoId");
