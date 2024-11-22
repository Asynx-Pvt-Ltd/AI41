/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Tool` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tool" DROP CONSTRAINT "Tool_categoryId_fkey";

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "ToolsOnCategories" (
    "toolId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "ToolsOnCategories_pkey" PRIMARY KEY ("toolId","categoryId")
);

-- AddForeignKey
ALTER TABLE "ToolsOnCategories" ADD CONSTRAINT "ToolsOnCategories_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsOnCategories" ADD CONSTRAINT "ToolsOnCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
