/*
  Warnings:

  - You are about to drop the column `enclosureId` on the `Animal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Animal" DROP CONSTRAINT "Animal_enclosureId_fkey";

-- AlterTable
ALTER TABLE "public"."Animal" DROP COLUMN "enclosureId";
