-- obtiene el promedio de notas finales en las practicas de un convenio
SELECT
    AVG("notaFinal") as "promedioPracticas"
FROM "Cursacion" c JOIN "Estudiante" e ON (c."estudianteRut" = e."rut")
                   JOIN "PracticaTomada" pt ON (pt."idEstudiante" = e."id")
                   JOIN "Convenio" cn ON (pt."idConvenio" = cn."id")
WHERE cn."id" = $1
LIMIT 1