SELECT distinct
    e."nombreCompleto",
    e."rut",
    e."agnioIngreso",
    (select max("agnio") from "Plan" where "agnio" <= e."agnioIngreso") as "plan",
    avg("notaFinal") over (partition by "rut") as promedio
FROM "Estudiante" e
         JOIN "Cursacion" c using ("idEstudiante")
WHERE e."idEstudiante" = $1

--MIGRADO A NUEVO MODELO

/*
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

--VERSION ANTIGUA
*/