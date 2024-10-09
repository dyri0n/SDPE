SELECT "agnio", round(cast(avg("notaFinal") as numeric),1) AS promedio
FROM "PlanContemplaAsignatura" pt
         JOIN "Cursacion" c
              ON (c."idAsignatura" = pt."idAsignatura")
         JOIN "Plan" p
              ON (p."id" = pt."idPlan" AND p."codigo" = $1)
WHERE pt."idAsignatura" = $2
GROUP BY "agnio"