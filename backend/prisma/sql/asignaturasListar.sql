SELECT a."idAsignatura",
    p."titulo" as "tituloPlan",
    p."codigo" as "codigoPlan",
    p."fechaInstauracion" as "fechaInstauracionPlan",
    a."codigo" as "codigoAsignatura",
    a."nombre" as "nombreAsignatura",
    a."nombreCorto" as "nombreCortoAsignatura",
    a."semestre" as "semestreRealizacion",
    a."areaFormacion"
FROM "Asignatura" a
JOIN "Plan" p ON (a."idPlan" = p."idPlan");