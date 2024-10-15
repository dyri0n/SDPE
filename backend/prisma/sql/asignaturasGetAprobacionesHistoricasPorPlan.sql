SELECT
    "agnio",
    (sum(CASE WHEN "notaFinal" >= 4.0 THEN 1 ELSE 0 END)::numeric / count(*) * 100) AS aprobacion
FROM "PlanContemplaAsignatura" pt
         JOIN "Cursacion" c ON (c."idAsignatura" = pt."idAsignatura" AND pt."idAsignatura" = $2)
         JOIN "Plan" p ON (p."id" = pt."idPlan" AND p."codigo" = $1)
GROUP BY "agnio"