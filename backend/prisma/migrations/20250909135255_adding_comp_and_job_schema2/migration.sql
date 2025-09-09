-- CreateEnum
CREATE TYPE "public"."companyRole" AS ENUM ('COMPANY');

-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "role" "public"."companyRole" NOT NULL DEFAULT 'COMPANY';
