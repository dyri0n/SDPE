-- AlterTable
ALTER TABLE "Convenio" ALTER COLUMN "fechaFinConvenio" SET DEFAULT now() + interval '1000 years';

-- AlterTable
ALTER TABLE "Modalidad" ALTER COLUMN "fechaDesuso" SET DEFAULT now() + interval '1000 years';

-- CreateTable
CREATE TABLE "LineaAsignatura" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "idPlan" INTEGER NOT NULL,

    CONSTRAINT "LineaAsignatura_pkey" PRIMARY KEY ("id","idPlan")
);

-- CreateTable
CREATE TABLE "LineaContemplaAsignatura" (
    "posicion" INTEGER NOT NULL,
    "idPlan" INTEGER NOT NULL,
    "idLinea" INTEGER NOT NULL,
    "idAsignatura" INTEGER NOT NULL,

    CONSTRAINT "LineaContemplaAsignatura_pkey" PRIMARY KEY ("posicion","idPlan","idLinea","idAsignatura")
);

-- CreateIndex
CREATE UNIQUE INDEX "LineaAsignatura_titulo_key" ON "LineaAsignatura"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "LineaContemplaAsignatura_posicion_key" ON "LineaContemplaAsignatura"("posicion");

-- AddForeignKey
ALTER TABLE "LineaAsignatura" ADD CONSTRAINT "LineaAsignatura_idPlan_fkey" FOREIGN KEY ("idPlan") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineaContemplaAsignatura" ADD CONSTRAINT "LineaContemplaAsignatura_idLinea_idPlan_fkey" FOREIGN KEY ("idLinea", "idPlan") REFERENCES "LineaAsignatura"("id", "idPlan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineaContemplaAsignatura" ADD CONSTRAINT "LineaContemplaAsignatura_idPlan_idAsignatura_fkey" FOREIGN KEY ("idPlan", "idAsignatura") REFERENCES "PlanContemplaAsignatura"("idPlan", "idAsignatura") ON DELETE RESTRICT ON UPDATE CASCADE;
