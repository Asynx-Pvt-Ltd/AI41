/*
  Warnings:

  - Added the required column `date` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "date" TEXT NOT NULL;
