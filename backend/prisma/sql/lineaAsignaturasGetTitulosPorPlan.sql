--MODELO ANTIGUO
SELECT
    "id" as "idLinea",
    "titulo"
FROM "LineaAsignatura" WHERE "idPlan" = $1;


-- MODELO NUEVO (ACTIVAR AL CAMBIAR DE RAMA!!!!!!)
/*
SELECT
    "idLinea", "titulo"
FROM "LineaAsignatura" JOIN "Asignatura" USING ("idLinea")
WHERE "idPlan" = $1
 */