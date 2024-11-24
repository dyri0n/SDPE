-- SELECT
--     es."nombreCompleto",
--     a."nombre" as "tituloPractica",
--     pca."caracter",
--     pr."posicionRelativa" as "numeroPractica",
--     pt."fechaInicio",
--     pt."fechaTermino" as  "fechaFin",
--     cu."notaFinal"
-- FROM "Convenio" c JOIN "PracticaTomada" pt on (c."id" = pt."idConvenio")
--                   JOIN "Practica" pr on (pt."idPractica" = pr."id" and pt."idAsignatura" = pr."idAsignatura" and pt."idPlan" = pr."idPlan")
--                   JOIN "PlanContemplaAsignatura" pca on (pca."idAsignatura" = pr."idAsignatura" and pca."idPlan" = pr."idPlan")
--                   JOIN "Asignatura" a on (pca."idAsignatura" = a."id")
--                   JOIN "Cursacion" cu on (cu."idAsignatura" = pr."idAsignatura" and cu."idPlan" = pr."idPlan")
--                   JOIN "Estudiante" es on (es."rut" = cu."estudianteRut")
-- WHERE c."id" = $1;

-- modelo nuevo

select distinct
    est."nombreCompleto",
    asi."nombre" as "tituloPractica",
    asi."caracter",
    (
        rank() over (order by asi."posicion")
    )::numeric as "numeroPractica",
    pto."fechaInicio",
    pto."fechaTermino" as "fechaFin",
    cur."notaFinal"

from "Convenio" con
join "PTConvenio" ptc using ("idConvenio")
join "PracticaTomada" pto using ("idPlan", "idAsignatura", "idEstudiante", "idCursacion")
join "Cursacion" cur using ("idPlan", "idAsignatura", "idEstudiante", "idCursacion")
join "Estudiante" est using ("idEstudiante")
join "Asignatura" asi using ("idPlan", "idAsignatura")
where con."idConvenio" = $1;

