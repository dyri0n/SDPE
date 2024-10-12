/*
  Warnings:

  - The `resultado` column on the `PracticaTomada` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EstadoAprobacion" AS ENUM ('APROBADO', 'DESAPROBADO');

-- AlterTable
ALTER TABLE "Convenio" ALTER COLUMN "documentoConvenio" DROP NOT NULL,
ALTER COLUMN "fechaFinConvenio" SET DEFAULT now() + interval '1000 years',
ALTER COLUMN "fechaInicioConvenio" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "urlFoto" DROP NOT NULL,
ALTER COLUMN "validez" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Modalidad" ALTER COLUMN "fechaDesuso" SET DEFAULT now() + interval '1000 years',
ALTER COLUMN "validez" SET DEFAULT true;

-- AlterTable
ALTER TABLE "PracticaTomada" ALTER COLUMN "fechaInicio" SET DATA TYPE DATE,
ALTER COLUMN "fechaTermino" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "fechaTermino" SET DATA TYPE DATE,
DROP COLUMN "resultado",
ADD COLUMN     "resultado" "EstadoAprobacion" NOT NULL DEFAULT 'APROBADO';
