/*
  Warnings:

  - A unique constraint covering the columns `[idPlan,titulo]` on the table `LineaAsignatura` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LineaAsignatura_titulo_key";

-- AlterTable
ALTER TABLE "Convenio" ALTER COLUMN "fechaFinConvenio" SET DEFAULT now() + interval '1000 years';

-- AlterTable
ALTER TABLE "Modalidad" ALTER COLUMN "fechaDesuso" SET DEFAULT now() + interval '1000 years';

-- CreateIndex
CREATE UNIQUE INDEX "LineaAsignatura_idPlan_titulo_key" ON "LineaAsignatura"("idPlan", "titulo");
