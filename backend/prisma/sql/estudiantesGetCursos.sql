SELECT
    a."id",
    a."codigo",
    pc."areaFormacion",
    c."agnio",
    c."semestreRelativo",
    c."numIntento",
    c."notaFinal"
FROM "Asignatura" a
         JOIN "PlanContemplaAsignatura" pc ON (a."id" = pc."idAsignatura")
         JOIN "Cursacion" c ON (c."idAsignatura" = a."id")
WHERE c."estudianteRut" = $1
ORDER BY "agnio", "semestreRelativo" DESC