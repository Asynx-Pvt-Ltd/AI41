/*
  Warnings:

  - You are about to drop the column `bestFor` on the `Tool` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "bestFor";

-- CreateTable
CREATE TABLE "JobRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "JobRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolsOnJobRoles" (
    "toolId" INTEGER NOT NULL,
    "jobRoleId" INTEGER NOT NULL,

    CONSTRAINT "ToolsOnJobRoles_pkey" PRIMARY KEY ("toolId","jobRoleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobRole_name_key" ON "JobRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JobRole_slug_key" ON "JobRole"("slug");

-- AddForeignKey
ALTER TABLE "ToolsOnJobRoles" ADD CONSTRAINT "ToolsOnJobRoles_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsOnJobRoles" ADD CONSTRAINT "ToolsOnJobRoles_jobRoleId_fkey" FOREIGN KEY ("jobRoleId") REFERENCES "JobRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
