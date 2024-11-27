/*
  Warnings:

  - The `hasFreePrice` column on the `Tool` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hasPaidPrice` column on the `Tool` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "hasFreePrice",
ADD COLUMN     "hasFreePrice" BOOLEAN,
DROP COLUMN "hasPaidPrice",
ADD COLUMN     "hasPaidPrice" BOOLEAN;
