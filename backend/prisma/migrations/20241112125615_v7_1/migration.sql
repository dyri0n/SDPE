-- AlterTable
ALTER TABLE "Convenio" ALTER COLUMN "fechaFinConvenio" SET DEFAULT now() + interval '1000 years';

-- AlterTable
ALTER TABLE "Modalidad" ALTER COLUMN "fechaDesuso" SET DEFAULT now() + interval '1000 years';
