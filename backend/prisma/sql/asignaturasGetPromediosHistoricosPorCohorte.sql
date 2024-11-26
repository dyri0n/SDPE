-- SELECT 
--      "agnio", 
--      "agnioIngreso", 
--      p."titulo", 
--      round(
--           cast(
--                avg("notaFinal") as numeric
--           ),
--      1) AS promedio
-- FROM "PlanContemplaAsignatura" pt
-- JOIN "Cursacion" c ON (c."idAsignatura" = pt."idAsignatura" AND pt."idAsignatura" = $1)
-- JOIN "Estudiante" e on (e."rut" = c."estudianteRut")
-- JOIN "Plan" p on (p."id" = pt."idPlan")
-- GROUP BY "agnio", "agnioIngreso", p."titulo";

-- MODELO NUEVO

select 
     c."agnio", -- año rendicion asignatura
     p."titulo", -- titulo plan
     e."agnioIngreso", -- cohorte del estudiante
     round(
          avg("notaFinal")::numeric, 
          2
     ) as promedio
from "Cursacion" c
join "Asignatura" a using ("idPlan", "idAsignatura")
join "Estudiante" e using ("idEstudiante")
join "Plan" p using ("idPlan")
where a."codigo" = $1
group by c."agnio", e."agnioIngreso", p."titulo"