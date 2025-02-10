/*
  Warnings:

  - Added the required column `cons` to the `Tool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pros` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "cons" TEXT NOT NULL,
ADD COLUMN     "pros" TEXT NOT NULL;
