--obtiene el porcentaje de aprobacion de un convenio
WITH notasFinales as (
    SELECT "notaFinal"
    FROM "Cursacion" c
             JOIN "Estudiante" e ON (c."estudianteRut" = e."rut")
             JOIN "PracticaTomada" pt ON (pt."idEstudiante" = e."id")
             JOIN "Convenio" cn ON (pt."idConvenio" = cn."id")
    WHERE cn."id" = $1
)
--PORCENTAJE DE APROBACION
SELECT (SUM(CASE WHEN "notaFinal" > 4.0 THEN 1 END) / COUNT(1) * 100)::numeric as porcentajeAprobacion
FROM notasFinales
LIMIT 1;