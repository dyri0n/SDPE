SELECT
    cn."titulo",
    c."notaFinal",
    c."numIntento",
    cn."centroPractica",
    m."nombreModalidad"
FROM "Convenio" cn
         JOIN "Modalidad" m ON (m."id" = cn."idModalidad")
         JOIN "PracticaTomada" pt ON (pt."idConvenio" = cn."id")
         JOIN "Estudiante" e ON (e."id"=pt."idEstudiante" AND e."id"=$1)
         JOIN "Cursacion" c ON (
    c."estudianteRut" = e."rut" AND
    c."idAsignatura" = pt."idAsignatura"
    )
ORDER BY "titulo", c."numIntento"