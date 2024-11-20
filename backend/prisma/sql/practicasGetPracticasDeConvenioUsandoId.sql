SELECT
    es."nombreCompleto",
    a."nombre" as "tituloPractica",
    pca."caracter",
    pr."posicionRelativa" as "numeroPractica",
    pt."fechaInicio",
    pt."fechaTermino" as  "fechaFin",
    cu."notaFinal"
FROM "Convenio" c JOIN "PracticaTomada" pt on (c."id" = pt."idConvenio")
                  JOIN "Practica" pr on (pt."idPractica" = pr."id" and pt."idAsignatura" = pr."idAsignatura" and pt."idPlan" = pr."idPlan")
                  JOIN "PlanContemplaAsignatura" pca on (pca."idAsignatura" = pr."idAsignatura" and pca."idPlan" = pr."idPlan")
                  JOIN "Asignatura" a on (pca."idAsignatura" = a."id")
                  JOIN "Cursacion" cu on (cu."idAsignatura" = pr."idAsignatura" and cu."idPlan" = pr."idPlan")
                  JOIN "Estudiante" es on (es."rut" = cu."estudianteRut")
WHERE c."id" = $1;