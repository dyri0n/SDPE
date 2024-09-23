/*
  Warnings:

  - You are about to drop the column `nota_final` on the `Cursacion` table. All the data in the column will be lost.
  - Added the required column `notaFinal` to the `Cursacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cursacion" DROP COLUMN "nota_final",
ADD COLUMN     "notaFinal" DOUBLE PRECISION NOT NULL;
