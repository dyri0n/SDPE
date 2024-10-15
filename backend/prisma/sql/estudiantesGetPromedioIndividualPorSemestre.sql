SELECT
    "semestreRelativo", avg("notaFinal") as "promedio"
FROM "Cursacion" WHERE "estudianteRut" = $1
GROUP BY "semestreRelativo"
ORDER BY "semestreRelativo"