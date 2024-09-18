/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `FeatureProject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FeatureProject_title_key" ON "FeatureProject"("title");
