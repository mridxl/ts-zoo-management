/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Animal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Enclosure` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Animal" DROP CONSTRAINT "Animal_enclosureId_fkey";

-- AlterTable
ALTER TABLE "public"."Admin" DROP CONSTRAINT "Admin_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Admin_id_seq";

-- AlterTable
ALTER TABLE "public"."Animal" DROP CONSTRAINT "Animal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "enclosureId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Animal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Animal_id_seq";

-- AlterTable
ALTER TABLE "public"."Enclosure" DROP CONSTRAINT "Enclosure_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Enclosure_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Enclosure_id_seq";

-- AddForeignKey
ALTER TABLE "public"."Animal" ADD CONSTRAINT "Animal_enclosureId_fkey" FOREIGN KEY ("enclosureId") REFERENCES "public"."Enclosure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
