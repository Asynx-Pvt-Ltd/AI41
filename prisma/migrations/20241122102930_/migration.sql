/*
  Warnings:

  - You are about to drop the `_CategoryToTool` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToTool" DROP CONSTRAINT "_CategoryToTool_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTool" DROP CONSTRAINT "_CategoryToTool_B_fkey";

-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CategoryToTool";

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
