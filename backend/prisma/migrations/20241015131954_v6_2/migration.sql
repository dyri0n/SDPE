/*
  Warnings:

  - A unique constraint covering the columns `[idPlan,idLinea,posicion]` on the table `LineaContemplaAsignatura` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LineaContemplaAsignatura_posicion_key";

-- AlterTable
ALTER TABLE "Convenio" ALTER COLUMN "fechaFinConvenio" SET DEFAULT now() + interval '1000 years';

-- AlterTable
ALTER TABLE "Modalidad" ALTER COLUMN "fechaDesuso" SET DEFAULT now() + interval '1000 years';

-- CreateIndex
CREATE UNIQUE INDEX "LineaContemplaAsignatura_idPlan_idLinea_posicion_key" ON "LineaContemplaAsignatura"("idPlan", "idLinea", "posicion");
