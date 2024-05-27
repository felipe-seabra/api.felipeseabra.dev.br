/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isMaster` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Gifts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessageForTheCouple` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MASTER', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "ButtonType" AS ENUM ('REPOSITORIO', 'SITE');

-- CreateEnum
CREATE TYPE "Logo" AS ENUM ('INSTAGRAM', 'LINKEDIN', 'FACEBOOK', 'EMAIL');

-- DropForeignKey
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_giftId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
DROP COLUMN "isMaster",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "Gifts";

-- DropTable
DROP TABLE "Guest";

-- DropTable
DROP TABLE "MessageForTheCouple";

-- DropTable
DROP TABLE "Supplier";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT[],
    "logo" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" "Logo" NOT NULL,
    "url" TEXT NOT NULL,
    "buttonType" "ButtonType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);
