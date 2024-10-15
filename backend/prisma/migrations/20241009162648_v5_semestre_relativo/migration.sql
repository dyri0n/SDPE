-- AlterTable
ALTER TABLE "Cursacion" ADD COLUMN     "semestreRelativo" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Modalidad" ALTER COLUMN "fechaDesuso" SET DEFAULT now() + interval '1000 years';
