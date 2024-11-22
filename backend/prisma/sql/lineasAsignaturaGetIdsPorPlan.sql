-- MODELO ANTIGUO

SELECT "id" as "idLinea" FROM "LineaAsignatura" WHERE "idPlan" = $1;

-- MODELO NUEVO (ACTIVAR AL CAMBIAR DE RAMA!!!!!!)
/*
SELECT "idLinea"
FROM "LineaAsignatura"
    JOIN "Asignatura" using ("idLinea")
WHERE "idPlan" = $1;
*/