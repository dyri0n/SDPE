--obtiene el porcentaje de aprobacion de un convenio
WITH notasFinales as (
    SELECT c."notaFinal"
    FROM "PracticaTomada" pt
             JOIN "Estudiante" e ON (pt."idEstudiante" = e."id")
             JOIN "Convenio" cn ON (
        cn."id" = pt."idConvenio"
        )
             JOIN "Cursacion" c ON (
        c."estudianteRut" = e."rut" AND
        c."idAsignatura" = pt."idAsignatura"
        )
    WHERE "idConvenio" = $1
)
--PORCENTAJE DE APROBACION
SELECT (SUM(CASE WHEN "notaFinal" > 4.0 THEN 1 END) / COUNT(1) * 100)::numeric as porcentajeAprobacion
FROM notasFinales
LIMIT 1;