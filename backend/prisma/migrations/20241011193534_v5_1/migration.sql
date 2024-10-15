/*
  Warnings:

  - The primary key for the `PracticaTomada` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Convenio" ALTER COLUMN "fechaFinConvenio" SET DEFAULT now() + interval '1000 years';

-- AlterTable
ALTER TABLE "Modalidad" ALTER COLUMN "fechaDesuso" SET DEFAULT now() + interval '1000 years';

-- AlterTable
ALTER TABLE "PracticaTomada" DROP CONSTRAINT "PracticaTomada_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PracticaTomada_pkey" PRIMARY KEY ("id", "idPractica", "idPlan", "idAsignatura", "idEstudiante", "idConvenio");
