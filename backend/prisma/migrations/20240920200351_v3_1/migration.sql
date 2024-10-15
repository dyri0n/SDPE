/*
  Warnings:

  - The primary key for the `Cursacion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[codigo]` on the table `Asignatura` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo` to the `Asignatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Cursacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asignatura" ADD COLUMN     "codigo" TEXT NOT NULL,
ADD COLUMN     "linkSyllabus" TEXT,
ADD COLUMN     "unidad" TEXT;

-- AlterTable
ALTER TABLE "Cursacion" DROP CONSTRAINT "Cursacion_pkey",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Cursacion_pkey" PRIMARY KEY ("id", "estudianteRut", "idAsignatura", "idPlan");

-- CreateIndex
CREATE UNIQUE INDEX "Asignatura_codigo_key" ON "Asignatura"("codigo");
