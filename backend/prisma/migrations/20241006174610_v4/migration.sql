/*
  Warnings:

  - You are about to drop the column `anioFin` on the `Convenio` table. All the data in the column will be lost.
  - You are about to drop the column `anioInicio` on the `Convenio` table. All the data in the column will be lost.
  - You are about to drop the column `entidad` on the `Convenio` table. All the data in the column will be lost.
  - You are about to drop the column `esVigente` on the `Convenio` table. All the data in the column will be lost.
  - You are about to drop the column `tipoPractica` on the `Convenio` table. All the data in the column will be lost.
  - The primary key for the `PracticaTomada` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rutEstudiante` on the `PracticaTomada` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[titulo]` on the table `Convenio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigo]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `centroPractica` to the `Convenio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentoConvenio` to the `Convenio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaFinConvenio` to the `Convenio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicioConvenio` to the `Convenio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idModalidad` to the `Convenio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Convenio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlFoto` to the `Convenio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validez` to the `Convenio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agnioIngreso` to the `Estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `competenciasRequeridas` on the `Practica` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `idEstudiante` to the `PracticaTomada` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `resultadoDiagnostico` on the `PracticaTomada` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "PracticaTomada" DROP CONSTRAINT "PracticaTomada_rutEstudiante_fkey";

-- DropIndex
DROP INDEX "Convenio_entidad_key";

-- AlterTable
ALTER TABLE "Convenio" DROP COLUMN "anioFin",
DROP COLUMN "anioInicio",
DROP COLUMN "entidad",
DROP COLUMN "esVigente",
DROP COLUMN "tipoPractica",
ADD COLUMN     "centroPractica" TEXT NOT NULL,
ADD COLUMN     "documentoConvenio" TEXT NOT NULL,
ADD COLUMN     "fechaFinConvenio" DATE NOT NULL,
ADD COLUMN     "fechaInicioConvenio" DATE NOT NULL,
ADD COLUMN     "idModalidad" INTEGER NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL,
ADD COLUMN     "urlFoto" TEXT NOT NULL,
ADD COLUMN     "validez" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Estudiante" ADD COLUMN     "agnioIngreso" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "codigo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Practica" DROP COLUMN "competenciasRequeridas",
ADD COLUMN     "competenciasRequeridas" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "PracticaTomada" DROP CONSTRAINT "PracticaTomada_pkey",
DROP COLUMN "rutEstudiante",
ADD COLUMN     "idEstudiante" INTEGER NOT NULL,
DROP COLUMN "resultadoDiagnostico",
ADD COLUMN     "resultadoDiagnostico" JSONB NOT NULL,
ADD CONSTRAINT "PracticaTomada_pkey" PRIMARY KEY ("idPractica", "idPlan", "idAsignatura", "idEstudiante", "idConvenio");

-- DropEnum
DROP TYPE "TIPO_PRACTICA";

-- CreateTable
CREATE TABLE "ResultadoEND" (
    "resultados" JSONB NOT NULL,
    "endId" INTEGER NOT NULL,
    "estudianteId" INTEGER NOT NULL,

    CONSTRAINT "ResultadoEND_pkey" PRIMARY KEY ("endId","estudianteId")
);

-- CreateTable
CREATE TABLE "END" (
    "id" INTEGER NOT NULL,
    "fechaRendicion" DATE NOT NULL,
    "formato" JSONB NOT NULL,

    CONSTRAINT "END_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modalidad" (
    "id" SERIAL NOT NULL,
    "nombreModalidad" TEXT NOT NULL,
    "fechaCreacion" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaDesuso" DATE DEFAULT now() + interval '1000 years',
    "validez" BOOLEAN NOT NULL,

    CONSTRAINT "Modalidad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResultadoEND_estudianteId_key" ON "ResultadoEND"("estudianteId");

-- CreateIndex
CREATE UNIQUE INDEX "Modalidad_nombreModalidad_key" ON "Modalidad"("nombreModalidad");

-- CreateIndex
CREATE UNIQUE INDEX "Convenio_titulo_key" ON "Convenio"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_codigo_key" ON "Plan"("codigo");

-- AddForeignKey
ALTER TABLE "ResultadoEND" ADD CONSTRAINT "ResultadoEND_endId_fkey" FOREIGN KEY ("endId") REFERENCES "END"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadoEND" ADD CONSTRAINT "ResultadoEND_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticaTomada" ADD CONSTRAINT "PracticaTomada_idEstudiante_fkey" FOREIGN KEY ("idEstudiante") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Convenio" ADD CONSTRAINT "Convenio_idModalidad_fkey" FOREIGN KEY ("idModalidad") REFERENCES "Modalidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
