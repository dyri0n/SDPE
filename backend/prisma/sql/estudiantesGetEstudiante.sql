SELECT
  e."nombreCompleto",
  e."rut",
  e."agnioIngreso",
  (select max("anio") from "Plan" where "anio" <= e."agnioIngreso") as "plan"
FROM "Estudiante" e WHERE e."id" = $1
LIMIT 1;