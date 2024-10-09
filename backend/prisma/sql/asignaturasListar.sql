SELECT a."id" as idAsignatura,
       a."codigo",
       a."nombre",
       ARRAY_AGG(pt."semestre") as semestreRealizacion,
       ARRAY_AGG(p."titulo") as planesDondeSeImparte,
       ARRAY_AGG(pt."areaFormacion") as areaFormacion
FROM "PlanContemplaAsignatura" pt
         JOIN "Asignatura" a ON (a."id" = pt."idAsignatura")
         JOIN "Plan" p ON (p."id" = pt."idPlan")
GROUP BY a."id", a."codigo", a."nombre";