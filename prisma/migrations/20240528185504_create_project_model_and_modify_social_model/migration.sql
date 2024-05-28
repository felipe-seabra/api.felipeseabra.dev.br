/*
  Warnings:

  - You are about to drop the column `buttonType` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Social` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Social" DROP COLUMN "buttonType",
DROP COLUMN "logo";

-- DropEnum
DROP TYPE "ButtonType";

-- DropEnum
DROP TYPE "Logo";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT[],
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
