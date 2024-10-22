SELECT
    cn."titulo",
    c."notaFinal",
    pr."posicionRelativa" as "numeroPractica",
    pr."nombre" as "nombrePractica",
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
    JOIN "PlanContemplaAsignatura" pc ON (pc."idAsignatura" = c."idAsignatura" and pc."idPlan" = pt."idPlan")
    JOIN "Practica" pr ON (pr."idAsignatura" = pc."idAsignatura" and pc."idPlan" = pr."idPlan")
ORDER BY "numeroPractica"
