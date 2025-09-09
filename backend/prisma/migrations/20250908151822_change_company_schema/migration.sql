/*
  Warnings:

  - A unique constraint covering the columns `[companyusername]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyusername` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "companyusername" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyusername_key" ON "public"."Company"("companyusername");
