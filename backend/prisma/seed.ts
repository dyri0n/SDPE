import {
  Asignatura,
  Convenio,
  Cursacion,
  EstadoAprobacion,
  Estudiante,
  LineaAsignatura,
  NIVEL,
  Plan,
  PracticaTomada,
  PrismaClient,
  PTConvenio,
  ResultadoEND,
} from '@prisma/client';
import * as constants from './seed-constants';
import * as util from 'util';
const prisma = new PrismaClient();
async function main() {
  // ESTUDIANTES

  const estudiantesInsertados: Estudiante[] =
    await prisma.estudiante.createManyAndReturn({
      data: constants.ESTUDIANTES,
    });

  moreLog(estudiantesInsertados);

  // PLANES

  const planesInsertados: Plan[] = await prisma.plan.createManyAndReturn({
    data: constants.PLANES,
  });

  moreLog(planesInsertados);

  // ASIGNATURAS

  const asignaturasQueries = [];
  for (const plan of planesInsertados) {
    for (const [i, asignatura] of constants.ASIGNATURAS.entries()) {
      asignatura.idPlan = plan.idPlan;
      asignatura.posicion = i + 1;

      asignaturasQueries.push({
        ...asignatura,
      });
    }
  }

  const asignaturasInsertadas: Asignatura[] =
    await prisma.asignatura.createManyAndReturn({
      data: asignaturasQueries,
    });

  moreLog(asignaturasInsertadas);

  // CURSACIONES

  console.info('Comienzo seeding cursaciones');
  console.time('CURSACIONES SEEDING');

  const cursacionesQueries: Cursacion[] = [];

  const planes = await prisma.plan.findMany();
  const asignaturas = await prisma.asignatura.findMany();
  const estudiantes = await prisma.estudiante.findMany();

  for (const plan of planes) {
    const asignaturasPorPlan = asignaturas.filter((asignatura) => {
      if (asignatura.idPlan == plan.idPlan) return asignatura;
    });

    moreLog(
      asignaturasPorPlan.map((asignaturas) => {
        return asignaturas.idPlan;
      }),
    );

    for (const estudiante of estudiantes) {
      // Porcentaje de asignaturas del plan cursadas
      // const nroAsignaturasCursadas: number = Math.floor(
      //   Math.random() * asignaturasPorPlan.length,
      // );

      // Total de asignaturas de los planes cursadas
      const nroAsignaturasCursadas: number = asignaturasPorPlan.length;

      let cursacionId = 0;
      for (const asignaturaCursada of asignaturasPorPlan.slice(
        0,
        nroAsignaturasCursadas,
      )) {
        const nroIntentos =
          1 + Math.random() > 0.7 ? (Math.random() > 0.9 ? 2 : 1) : 0;
        // 30% chance de repetir el ramo, 3% chance de repetirlo dos veces

        for (
          let intentoActual = 1;
          intentoActual <= nroIntentos;
          intentoActual++
        ) {
          const nota =
            nroIntentos == intentoActual
              ? roundTo(Math.random() * 3 + 4, 2)
              : roundTo(Math.random() * 3 + 1, 2);

          cursacionesQueries.push({
            idCursacion: cursacionId,
            agnio: 2024,
            notaFinal: nota,
            grupo: Math.random() > 0.5 ? 'A' : 'B',
            numIntento: intentoActual,
            semestreRelativo: Math.random() * 10,

            idPlan: asignaturaCursada.idPlan,
            idAsignatura: asignaturaCursada.idAsignatura,
            idEstudiante: estudiante.idEstudiante,
          });

          cursacionId++;
        }
      }
    }
  }

  const cursacionesInsertadas = await prisma.cursacion.createManyAndReturn({
    data: cursacionesQueries,
    include: {
      Asignatura: true,
      Estudiante: true,
    },
  });

  moreLog(cursacionesInsertadas);

  console.timeEnd('CURSACIONES SEEDING');

  // ENDS

  console.time('END SEEDING');

  const endsInsertadas = await prisma.eND.createManyAndReturn({
    data: constants.ENDS,
  });

  moreLog(endsInsertadas);

  // RESULTADOS END

  const ENDS = await prisma.eND.findMany();
  const resultadosENDQueries: ResultadoEND[] = [];
  for (const end of ENDS) {
    for (const estudiante of estudiantes) {
      const resultado_estudiante: constants.FORMATO_RESPUESTA = {
        tematicas: {
          t1: {
            e1: new constants.Porcentaje(Math.random()).valor,
            e2: new constants.Porcentaje(Math.random()).valor,
          },
          t2: {
            e3: new constants.Porcentaje(Math.random()).valor,
            e4: new constants.Porcentaje(Math.random()).valor,
            e5: new constants.Porcentaje(Math.random()).valor,
            e6: new constants.Porcentaje(Math.random()).valor,
            e7: new constants.Porcentaje(Math.random()).valor,
            e8: new constants.Porcentaje(Math.random()).valor,
          },
          t3: {
            e10: new constants.Porcentaje(Math.random()).valor,
          },
        },
        preguntas_abiertas: {
          pa1: {
            nivel_alcanzado: constants.getRandomEnumValue(constants.Nivel_PA),
          },
          pa2: {
            nivel_alcanzado: constants.getRandomEnumValue(constants.Nivel_PA),
          },
          pa3: {
            nivel_alcanzado: constants.getRandomEnumValue(constants.Nivel_PA),
          },
          pa4: {
            nivel_alcanzado: constants.getRandomEnumValue(constants.Nivel_PA),
          },
          pa5: {
            nivel_alcanzado: constants.getRandomEnumValue(constants.Nivel_PA),
          },
        },
      };

      resultadosENDQueries.push({
        resultados: resultado_estudiante,
        idEND: end.idEND,
        idEstudiante: estudiante.idEstudiante,
      });
    }
  }

  const resultados: ResultadoEND[] =
    await prisma.resultadoEND.createManyAndReturn({
      data: resultadosENDQueries,
    });

  moreLog(resultados);

  console.timeEnd('END SEEDING');

  // PRACTICAS

  console.info('Se comienza el seeding de Prácticas');
  console.time('PRACTICA SEEDING');

  const modalidades = await prisma.modalidad.createManyAndReturn({
    data: constants.MODALIDADES,
  });

  moreLog(modalidades);

  const conveniosInsertados = await prisma.convenio.createManyAndReturn({
    data: constants.CONVENIOS,
  });

  moreLog(conveniosInsertados);

  const practicasTomadasQueries: PracticaTomada[] = [];
  const date0 = new Date(2016, 1, 1);
  const date1 = new Date('2020-01-01');
  const date2 = new Date(2024, 12, 31);

  const cursacionesPracticas = cursacionesInsertadas.filter((cursacion) => {
    if (cursacion.Asignatura.caracter === 'PRACTICA') return cursacion;
  });
  for (const cursacionPractica of cursacionesPracticas) {
    const asignatura = cursacionPractica.Asignatura;
    const estudiante = cursacionPractica.Estudiante;

    practicasTomadasQueries.push({
      fechaInicio:
        cursacionPractica.numIntento > 1
          ? randomDate(date0, date1)
          : randomDate(date1, date2),
      fechaTermino: undefined,
      resultadoDiagnostico: {},
      resultado:
        cursacionPractica.numIntento > 1
          ? EstadoAprobacion.DESAPROBADO
          : EstadoAprobacion.APROBADO,
      idEstudiante: estudiante.idEstudiante,
      idPlan: asignatura.idPlan,
      idAsignatura: asignatura.idAsignatura,
      idCursacion: cursacionPractica.idCursacion,
    });
  }

  const practicastomadas = await prisma.practicaTomada.createManyAndReturn({
    data: practicasTomadasQueries,
  });

  moreLog(practicastomadas);

  const PTConveniosQueries: PTConvenio[] = [];

  const practicasTomadas: PracticaTomada[] =
    await prisma.practicaTomada.findMany();
  const convenios: Convenio[] = await prisma.convenio.findMany();

  for (const practicaTomada of practicasTomadas) {
    const nroConvenios = Math.ceil(Math.random() * 2);
    const conveniosSeleccionados: UniqueStack<Convenio> = new UniqueStack();
    while (conveniosSeleccionados.length() < nroConvenios) {
      conveniosSeleccionados.push(constants.getRandomElement(convenios));
    }

    for (const convenio of conveniosSeleccionados) {
      PTConveniosQueries.push({
        nivel: constants.getRandomEnumValue(NIVEL),
        idPlan: practicaTomada.idPlan,
        idAsignatura: practicaTomada.idAsignatura,
        idEstudiante: practicaTomada.idEstudiante,
        idCursacion: practicaTomada.idCursacion,
        idConvenio: convenio.idConvenio,
      });
    }
  }

  const PTConvenios = await prisma.pTConvenio.createManyAndReturn({
    data: PTConveniosQueries,
  });

  moreLog(PTConvenios);

  console.timeEnd('PRACTICA SEEDING');
  console.info('El seeding de prácticas terminó');

  // LINEAS ASIGNATURAS

  console.time('LINEA_ASIGNATURA SEEDING');
  console.info('El seeding de las lineas de asignaturas está comenzando');

  const lineasQueries: LineaAsignatura[] = [];
  for (const linea of constants.LINEA_ASIGNATURA) {
    lineasQueries.push({
      idLinea: linea.idLinea,
      titulo: linea.titulo,
    });
  }

  const lineasAsignaturas = await prisma.lineaAsignatura.createManyAndReturn({
    data: lineasQueries,
  });

  moreLog(lineasAsignaturas);

  console.timeEnd('LINEA_ASIGNATURA SEEDING');
  console.info('El seeding de lineas de asignaturas termino');
}

const moreLog = function (obj: any): void {
  console.log(util.inspect(obj, true, null, true));
};

const roundTo = function (num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
};

const randomDate = function (start: Date, end: Date): Date {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = Math.random() * (endTime - startTime) + startTime;
  return new Date(randomTime);
};

class UniqueStack<T> implements Iterable<T> {
  public stack: T[] = [];

  public push(item: T) {
    if (this.stack.includes(item)) return;
    this.stack.push(item);
  }

  public pop() {
    return this.stack.pop();
  }

  public length() {
    return this.stack.length;
  }

  public [Symbol.iterator]() {
    return {
      next: function () {
        return {
          done: this.stack.length === 0,
          value: this.stack.pop(),
        };
      }.bind(this),
    };
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
