/*
  Warnings:

  - You are about to drop the column `nota` on the `Cursacion` table. All the data in the column will be lost.
  - Added the required column `nota_final` to the `Cursacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cursacion" DROP COLUMN "nota",
ADD COLUMN     "nota_final" DOUBLE PRECISION NOT NULL;
