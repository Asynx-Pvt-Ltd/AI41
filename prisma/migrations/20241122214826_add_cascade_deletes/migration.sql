-- DropForeignKey
ALTER TABLE "ToolsOnCategories" DROP CONSTRAINT "ToolsOnCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ToolsOnCategories" DROP CONSTRAINT "ToolsOnCategories_toolId_fkey";

-- DropForeignKey
ALTER TABLE "ToolsOnJobRoles" DROP CONSTRAINT "ToolsOnJobRoles_jobRoleId_fkey";

-- DropForeignKey
ALTER TABLE "ToolsOnJobRoles" DROP CONSTRAINT "ToolsOnJobRoles_toolId_fkey";

-- AddForeignKey
ALTER TABLE "ToolsOnJobRoles" ADD CONSTRAINT "ToolsOnJobRoles_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsOnJobRoles" ADD CONSTRAINT "ToolsOnJobRoles_jobRoleId_fkey" FOREIGN KEY ("jobRoleId") REFERENCES "JobRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsOnCategories" ADD CONSTRAINT "ToolsOnCategories_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsOnCategories" ADD CONSTRAINT "ToolsOnCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
