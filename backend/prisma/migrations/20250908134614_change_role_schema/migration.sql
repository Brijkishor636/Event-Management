-- CreateEnum
CREATE TYPE "public"."userRole" AS ENUM ('STUDENT', 'ADMIN', 'COMPANY');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."userRole" NOT NULL DEFAULT 'STUDENT';
