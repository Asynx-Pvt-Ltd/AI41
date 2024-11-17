/*
  Warnings:

  - Added the required column `slugUrl` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "slugUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "bestFor" TEXT[];
