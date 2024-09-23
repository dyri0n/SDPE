-- CreateEnum
CREATE TYPE "CARACTER" AS ENUM ('NORMAL', 'ELECTIVO', 'PRACTICA', 'TITULACION');

-- CreateEnum
CREATE TYPE "AREA" AS ENUM ('FP', 'FG', 'FE', 'FB');

-- CreateEnum
CREATE TYPE "TIPO_PRACTICA" AS ENUM ('COLEGIO_REGULAR_PIE', 'NO_CONVENCIONAL', 'ESCUELA_ESPECIAL', 'COLEGIO_ESPECIAL', 'ESCUELA_DE_LENGUAJE');

-- CreateTable
CREATE TABLE "Asignatura" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Asignatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" SERIAL NOT NULL,
    "rut" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cursacion" (
    "estudianteRut" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "numIntento" INTEGER NOT NULL,
    "grupo" TEXT NOT NULL,
    "agnio" INTEGER NOT NULL,
    "idAsignatura" INTEGER NOT NULL,
    "idPlan" INTEGER NOT NULL,

    CONSTRAINT "Cursacion_pkey" PRIMARY KEY ("estudianteRut","idAsignatura","idPlan")
);

-- CreateTable
CREATE TABLE "Practica" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "posicionRelativa" INTEGER NOT NULL,
    "competenciasRequeridas" TEXT[],
    "idPlan" INTEGER NOT NULL,
    "idAsignatura" INTEGER NOT NULL,

    CONSTRAINT "Practica_pkey" PRIMARY KEY ("id","idPlan","idAsignatura")
);

-- CreateTable
CREATE TABLE "PracticaTomada" (
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaTermino" TIMESTAMP(3) NOT NULL,
    "resultadoDiagnostico" TEXT[],
    "resultado" TEXT NOT NULL,
    "rutEstudiante" TEXT NOT NULL,
    "idPractica" INTEGER NOT NULL,
    "idPlan" INTEGER NOT NULL,
    "idAsignatura" INTEGER NOT NULL,
    "idConvenio" INTEGER NOT NULL,

    CONSTRAINT "PracticaTomada_pkey" PRIMARY KEY ("idPractica","idPlan","idAsignatura","rutEstudiante","idConvenio")
);

-- CreateTable
CREATE TABLE "Convenio" (
    "id" SERIAL NOT NULL,
    "entidad" TEXT NOT NULL,
    "tipoPractica" "TIPO_PRACTICA" NOT NULL,
    "esVigente" BOOLEAN NOT NULL,
    "anioInicio" DATE NOT NULL,
    "anioFin" DATE NOT NULL,

    CONSTRAINT "Convenio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanContemplaAsignatura" (
    "semestre" INTEGER NOT NULL,
    "posicion" INTEGER NOT NULL,
    "caracter" "CARACTER" NOT NULL,
    "areaFormacion" "AREA" NOT NULL,
    "idPlan" INTEGER NOT NULL,
    "idAsignatura" INTEGER NOT NULL,

    CONSTRAINT "PlanContemplaAsignatura_pkey" PRIMARY KEY ("idPlan","idAsignatura")
);

-- CreateTable
CREATE TABLE "Tributacion" (
    "idPlan" INTEGER NOT NULL,
    "idAsignaturaRequerida" INTEGER NOT NULL,
    "idAsignaturaTributada" INTEGER NOT NULL,

    CONSTRAINT "Tributacion_pkey" PRIMARY KEY ("idPlan","idAsignaturaTributada","idAsignaturaRequerida")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "fechaInstauracion" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_rut_key" ON "Estudiante"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "Practica_idPlan_idAsignatura_key" ON "Practica"("idPlan", "idAsignatura");

-- CreateIndex
CREATE UNIQUE INDEX "Convenio_entidad_key" ON "Convenio"("entidad");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_titulo_key" ON "Plan"("titulo");

-- AddForeignKey
ALTER TABLE "Cursacion" ADD CONSTRAINT "Cursacion_estudianteRut_fkey" FOREIGN KEY ("estudianteRut") REFERENCES "Estudiante"("rut") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cursacion" ADD CONSTRAINT "Cursacion_idAsignatura_idPlan_fkey" FOREIGN KEY ("idAsignatura", "idPlan") REFERENCES "PlanContemplaAsignatura"("idAsignatura", "idPlan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practica" ADD CONSTRAINT "Practica_idPlan_fkey" FOREIGN KEY ("idPlan") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practica" ADD CONSTRAINT "Practica_idPlan_idAsignatura_fkey" FOREIGN KEY ("idPlan", "idAsignatura") REFERENCES "PlanContemplaAsignatura"("idPlan", "idAsignatura") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticaTomada" ADD CONSTRAINT "PracticaTomada_rutEstudiante_fkey" FOREIGN KEY ("rutEstudiante") REFERENCES "Estudiante"("rut") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticaTomada" ADD CONSTRAINT "PracticaTomada_idPractica_idPlan_idAsignatura_fkey" FOREIGN KEY ("idPractica", "idPlan", "idAsignatura") REFERENCES "Practica"("id", "idPlan", "idAsignatura") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticaTomada" ADD CONSTRAINT "PracticaTomada_idConvenio_fkey" FOREIGN KEY ("idConvenio") REFERENCES "Convenio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanContemplaAsignatura" ADD CONSTRAINT "PlanContemplaAsignatura_idPlan_fkey" FOREIGN KEY ("idPlan") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanContemplaAsignatura" ADD CONSTRAINT "PlanContemplaAsignatura_idAsignatura_fkey" FOREIGN KEY ("idAsignatura") REFERENCES "Asignatura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tributacion" ADD CONSTRAINT "Tributacion_idPlan_idAsignaturaRequerida_fkey" FOREIGN KEY ("idPlan", "idAsignaturaRequerida") REFERENCES "PlanContemplaAsignatura"("idPlan", "idAsignatura") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tributacion" ADD CONSTRAINT "Tributacion_idPlan_idAsignaturaTributada_fkey" FOREIGN KEY ("idPlan", "idAsignaturaTributada") REFERENCES "PlanContemplaAsignatura"("idPlan", "idAsignatura") ON DELETE RESTRICT ON UPDATE CASCADE;
