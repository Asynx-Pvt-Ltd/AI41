/*
  Warnings:

  - Added the required column `likeCount` to the `Tutorial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viewCount` to the `Tutorial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tutorial" ADD COLUMN     "likeCount" BIGINT NOT NULL,
ADD COLUMN     "viewCount" BIGINT NOT NULL;
