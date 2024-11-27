/*
  Warnings:

  - You are about to drop the column `priceTag` on the `Tool` table. All the data in the column will be lost.
  - Added the required column `hasFreePrice` to the `Tool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasPaidPrice` to the `Tool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidPrice` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "priceTag",
ADD COLUMN     "hasFreePrice" INTEGER NOT NULL,
ADD COLUMN     "hasPaidPrice" INTEGER NOT NULL,
ADD COLUMN     "paidPrice" TEXT NOT NULL;
