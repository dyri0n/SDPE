SELECT
    e."nombreCompleto",
    e."rut",
    e."agnioIngreso",
    (select max("anio") from "Plan" where "anio" <= e."agnioIngreso") as "plan",
    avg("notaFinal") over (partition by "estudianteRut") as promedio
FROM "Estudiante" e
         JOIN "Cursacion" c ON (e."rut"=c."estudianteRut")
WHERE e."id" = $1
LIMIT 1;