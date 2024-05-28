/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Social` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_url_key" ON "Project"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Social_url_key" ON "Social"("url");
