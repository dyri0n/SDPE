SELECT "agnio", "agnioIngreso", p."titulo", round(cast(avg("notaFinal") as numeric),1) AS promedio
FROM "PlanContemplaAsignatura" pt
         JOIN "Cursacion" c ON (c."idAsignatura" = pt."idAsignatura" AND pt."idAsignatura" = $1)
    --
         JOIN "Estudiante" e on (e."rut" = c."estudianteRut")
    --
         JOIN "Plan" p on (p."id" = pt."idPlan")
GROUP BY "agnio", "agnioIngreso", p."titulo"