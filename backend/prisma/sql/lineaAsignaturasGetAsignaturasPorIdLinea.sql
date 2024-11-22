--MODELO ANTIGUO
SELECT distinct
    la."titulo",
    a."id" as "idAsignatura",
    a."codigo",
    a."nombre",
    "areaFormacion"
FROM "Asignatura" a JOIN "LineaContemplaAsignatura" lca on ("idAsignatura" = a."id")
                    JOIN "LineaAsignatura" la on ("idLinea" = la."id")
                    JOIN "PlanContemplaAsignatura" pca on (pca."idPlan" = lca."idPlan" and pca."idAsignatura"= a."id")
WHERE pca."idPlan" = $1 AND lca."idLinea" = $2

-- MODELO NUEVO (ACTIVAR AL CAMBIAR DE RAMA!!!!!!)
/*
SELECT distinct
    la."titulo,
    a."idAsignatura"
    a."codigo",
    a."nombre",
    a."areaFormacion"
FROM "Asignatura" a JOIN "LineaAsignatura" using ("idLinea")
WHERE a."idPlan" = $1 AND a."idLinea" = $2
*/

