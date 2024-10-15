SELECT
    a."id",
    a."codigo",
    a."nombre",
    pc."areaFormacion",
    c."agnio",
    c."semestreRelativo",
    c."numIntento",
    c."notaFinal"
FROM "Asignatura" a
         JOIN "Cursacion" c ON (c."idAsignatura" = a."id")
         JOIN "PlanContemplaAsignatura" pc ON (a."id" = pc."idAsignatura" and pc."idPlan" = c."idPlan")
WHERE c."estudianteRut" = $1
ORDER BY "agnio", "semestreRelativo" DESC