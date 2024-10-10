SELECT "agnio", round(cast(avg("notaFinal") as numeric),1) AS promedio
FROM "PlanContemplaAsignatura" pt
         JOIN "Cursacion" c using ("idAsignatura")
WHERE pt."idAsignatura" = $1
GROUP BY "agnio"