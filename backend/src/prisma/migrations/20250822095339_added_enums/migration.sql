/*
  Warnings:

  - The `health_status` column on the `Animal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `gender` on the `Animal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "public"."HealthStatus" AS ENUM ('Healthy', 'Sick', 'Injured', 'Recovering', 'Critical');

-- AlterTable
ALTER TABLE "public"."Animal" DROP COLUMN "gender",
ADD COLUMN     "gender" "public"."Gender" NOT NULL,
DROP COLUMN "health_status",
ADD COLUMN     "health_status" "public"."HealthStatus" NOT NULL DEFAULT 'Healthy';
