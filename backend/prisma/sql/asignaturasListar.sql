SELECT 
    a."idAsignatura",
    a."codigo" as "codigoAsignatura",
    a."nombre" as "nombreAsignatura",
    a."nombreCorto" as "nombreCortoAsignatura",
    a."semestre" as "semestreRealizacion",
    a."areaFormacion",
    JSON_ARRAYAGG(
        json_build_object(
            'titulo', p."titulo",
            'codigo', p."codigo",
            'fechaInstauracion', p."fechaInstauracion"
        )
    ) as "planes"
FROM "Asignatura" a
JOIN "Plan" p ON (a."idPlan" = p."idPlan")
GROUP BY 
    a."idAsignatura",
    a."codigo",
    a."nombre",
    a."nombreCorto",
    a."semestre",
    a."areaFormacion";
