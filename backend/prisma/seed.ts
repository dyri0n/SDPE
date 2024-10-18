import {
  AREA,
  Asignatura,
  CARACTER,
  EstadoAprobacion,
  Estudiante,
  LineaAsignatura,
  LineaContemplaAsignatura,
  Plan,
  PlanContemplaAsignatura,
  Practica,
  PracticaTomada,
  PrismaClient,
  ResultadoEND,
} from '@prisma/client';
import * as constants from './seed-constants';
import * as util from 'util';
const prisma = new PrismaClient();
async function main() {
  // ESTUDIANTES

  const estudiantesQueries = [];
  for (const estudiante of constants.ESTUDIANTES) {
    estudiantesQueries.push({
      rut: estudiante.rut,
      nombreCompleto: estudiante.nombreCompleto,
      agnioIngreso: estudiante.agnioIngreso,
    });
  }

  const estudiantesInsertados: Estudiante[] =
    await prisma.estudiante.createManyAndReturn({
      data: estudiantesQueries,
    });

  moreLog(estudiantesInsertados);

  // ASIGNATURAS

  const asignaturasQueries = [];
  for (const asignatura of constants.ASIGNATURAS) {
    asignaturasQueries.push({
      id: asignatura.id,
      codigo: asignatura.codigo,
      nombre: asignatura.nombre,
      descripcion: asignatura.descripcion,
      unidad: asignatura.unidad,
      linkSyllabus: asignatura.linkSyllabus,
    });
  }

  const asignaturasInsertadas: Asignatura[] =
    await prisma.asignatura.createManyAndReturn({
      data: asignaturasQueries,
    });

  moreLog(asignaturasInsertadas);

  // PLANES

  const planesQueries = [];
  for (const plan of constants.PLANES) {
    planesQueries.push({
      codigo: plan.codigo,
      titulo: plan.titulo,
      anio: plan.anio,
      fechaInstauracion: plan.fechaInstauracion,
    });
  }

  const planesInsertados: Plan[] = await prisma.plan.createManyAndReturn({
    data: planesQueries,
  });

  moreLog(planesInsertados);

  // ASIGNATURAS CONTEMPLADAS

  const planesDeEstudio: Plan[] = await prisma.plan.findMany();
  const asignaturas: Asignatura[] = await prisma.asignatura.findMany();

  console.info('Comienzo seeding asignaturas contempladas');

  console.time('ASIGNATURAS CONTEMPLADAS SEEDING');

  const asignaturasContempladasQueries: PlanContemplaAsignatura[] = [];
  for (const plan of planesDeEstudio) {
    let cuentaPosicion = 0;

    for (const asignatura of asignaturas) {
      asignaturasContempladasQueries.push({
        caracter: constants.getRandomEnumValue(CARACTER),
        areaFormacion: constants.getRandomEnumValue(AREA),
        semestre: Math.floor(Math.random() * 10),
        posicion: cuentaPosicion++,
        idPlan: plan.id,
        idAsignatura: asignatura.id,
      });
    }
  }

  const asignaturasContempladasInsertadas =
    await prisma.planContemplaAsignatura.createManyAndReturn({
      data: asignaturasContempladasQueries,
    });

  moreLog(asignaturasContempladasInsertadas);

  console.timeEnd('ASIGNATURAS CONTEMPLADAS SEEDING');

  // CURSACIONES

  const cursacionesQueries = [];

  const estudiantes: Estudiante[] = await prisma.estudiante.findMany();

  console.info('Comienzo seeding cursaciones');
  console.time('CURSACIONES SEEDING');

  for (const plan of planesDeEstudio) {
    const asignaturasContempladas: PlanContemplaAsignatura[] =
      await prisma.planContemplaAsignatura.findMany({
        where: {
          idPlan: plan.id,
        },
      });

    for (const estudiante of estudiantes) {
      const nroAsignaturasCursadas: number = Math.floor(
        Math.random() * asignaturasContempladas.length,
      );
      let cursacionId = 0;
      for (const asignaturasContemplada of asignaturasContempladas.slice(
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
            id: cursacionId,
            agnio: 2024,
            notaFinal: nota,
            grupo: Math.random() > 0.5 ? 'A' : 'B',
            numIntento: intentoActual,
            semestreRelativo: Math.random() * 10,

            idPlan: asignaturasContemplada.idPlan,
            idAsignatura: asignaturasContemplada.idAsignatura,
            estudianteRut: estudiante.rut,
          });

          cursacionId++;
        }
      }
    }
  }

  const cursacionesInsertadas = await prisma.cursacion.createManyAndReturn({
    data: cursacionesQueries,
  });

  moreLog(cursacionesInsertadas);

  console.timeEnd('CURSACIONES SEEDING');

  // TRIBUTACIONES

  console.log('Se estan seedeando las tributaciones');
  console.time('TRIBUTACIONES SEEDING');

  const tributacionesQueries = [];

  for (const plan of planesDeEstudio) {
    const asignaturasContempladas: PlanContemplaAsignatura[] =
      await prisma.planContemplaAsignatura.findMany({
        where: {
          idPlan: plan.id,
        },
      });

    for (const asigCont of asignaturasContempladas) {
      // max 3 prerrequisitos
      const nroPrerrequisitos = Math.floor(Math.random() * 3);

      // conseguir asignaturas previas a la actual
      const asignaturasPrevias: PlanContemplaAsignatura[] =
        await prisma.planContemplaAsignatura.findMany({
          where: {
            idPlan: plan.id,
            semestre: {
              lt: asigCont.semestre,
            },
          },
        });

      // si no tiene ninguna no puede tener prerrequisitos
      if (asignaturasPrevias.length === 0) continue;

      // asignaturas unicas seleccionadas al azar
      const codigosSeleccionadosPrerrequisitos = new UniqueStack<number>();

      for (let i = 0; i < nroPrerrequisitos; i++) {
        codigosSeleccionadosPrerrequisitos.push(
          asignaturasPrevias[
            Math.floor(Math.random() * asignaturasPrevias.length)
          ].idAsignatura,
        );
      }

      for (const id of codigosSeleccionadosPrerrequisitos) {
        tributacionesQueries.push({
          idPlan: plan.id,
          idAsignaturaTributada: id,
          idAsignaturaRequerida: asigCont.idAsignatura,
        });
      }
    }
  }

  const tributacionesInsertadas = await prisma.tributacion.createManyAndReturn({
    data: tributacionesQueries,
  });

  moreLog(tributacionesInsertadas);

  console.timeEnd('TRIBUTACIONES SEEDING');

  // ENDS

  console.time('END SEEDING');

  const endQueries = [];
  for (const end of constants.ENDS) {
    endQueries.push({
      id: end.id,
      fechaRendicion: end.fechaRendicion,
      formato: end.formato,
    });
  }

  const endsInsertadas = await prisma.eND.createManyAndReturn({
    data: endQueries,
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
        endId: end.id,
        estudianteId: estudiante.id,
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

  const convenios = await prisma.convenio.createManyAndReturn({
    data: constants.CONVENIOS,
  });

  moreLog(convenios);

  const practicasQueries: Practica[] = [];
  for (const plan of planesDeEstudio) {
    const asigcontpracticas = asignaturasContempladasInsertadas.filter(
      (asigcont) => {
        if (
          asigcont.idPlan === plan.id &&
          asigcont.caracter === CARACTER.PRACTICA
        )
          return asigcont;
      },
    );

    for (const practica of constants.PRACTICAS) {
      let practicatopush;
      let maxtries = 0;

      do {
        practicatopush = {
          id: practica.id,
          nombre: practica.nombre,
          posicionRelativa: practica.posicionRelativa,
          competenciasRequeridas: practica.competenciasRequeridas,
          idPlan: plan.id,
          idAsignatura:
            constants.getRandomElement(asigcontpracticas).idAsignatura,
        };
        maxtries++;
      } while (
        practicasQueries.some(
          (p) =>
            p.idPlan === practicatopush.idPlan &&
            p.idAsignatura === practicatopush.idAsignatura,
        ) &&
        maxtries < 10
      );

      if (maxtries == 10) console.log('error maxtries');

      moreLog(practicatopush);
      practicasQueries.push(practicatopush);
    }
  }

  const practicas = await prisma.practica.createManyAndReturn({
    data: practicasQueries,
  });

  moreLog(practicas);

  const practicastomadas_upsert: PracticaTomada[] = [];
  const date0 = new Date(2016, 1, 1);
  const date1 = new Date('2020-01-01');
  const date2 = new Date(2024, 12, 31);

  for (const practica of practicas) {
    for (const estudiante of estudiantesInsertados) {
      let intentos = Math.random() > 0.8 ? 2 : 1;

      for (intentos; intentos > 0; intentos--) {
        practicastomadas_upsert.push({
          id: undefined,
          // prettier-ignore
          fechaInicio:
            intentos > 1 
              ? randomDate(date0, date1) 
              : randomDate(date1, date2),
          fechaTermino: undefined,
          resultadoDiagnostico: {},
          resultado:
            intentos > 1
              ? EstadoAprobacion.DESAPROBADO
              : EstadoAprobacion.APROBADO,
          idEstudiante: estudiante.id,
          idPractica: practica.id,
          idPlan: practica.idPlan,
          idAsignatura: practica.idAsignatura,
          idConvenio: constants.getRandomElement(convenios).id,
        });
      }
    }
  }

  const practicastomadas = await prisma.practicaTomada.createManyAndReturn({
    data: practicastomadas_upsert,
  });

  moreLog(practicastomadas);

  console.timeEnd('PRACTICA SEEDING');
  console.info('El seeding de prácticas terminó');

  console.time('LINEA_ASIGNATURA SEEDING');
  console.info('El seeding de las lineas de asignaturas está comenzando');

  const lineasQueries: LineaAsignatura[] = [];
  for (const plan of planesDeEstudio) {
    for (const linea of constants.LINEA_ASIGNATURA) {
      lineasQueries.push({
        id: linea.id,
        titulo: linea.titulo,
        idPlan: plan.id,
      });
    }
  }

  const lineasAsignaturas = await prisma.lineaAsignatura.createManyAndReturn({
    data: lineasQueries,
  });

  moreLog(lineasAsignaturas);

  const lineaContemplaAsignaturaQueries: LineaContemplaAsignatura[] = [];
  for (const plan of planesDeEstudio) {
    const asigcontempladas = asignaturasContempladasInsertadas.filter(
      (asigcont) => {
        if (asigcont.idPlan === plan.id) return asigcont;
      },
    );

    for (const linea of constants.LINEA_ASIGNATURA) {
      let counter = 0;
      for (const asigcont of asigcontempladas) {
        if (Math.random() > 0.9) {
          const lcasig = {
            posicion: counter,
            idPlan: asigcont.idPlan,
            idLinea: linea.id,
            idAsignatura: asigcont.idAsignatura,
          };

          lineaContemplaAsignaturaQueries.push(lcasig);

          counter++;
        }
      }
    }
  }

  const lineaContemplaAsignatura: LineaContemplaAsignatura[] =
    await prisma.lineaContemplaAsignatura.createManyAndReturn({
      data: lineaContemplaAsignaturaQueries,
    });

  moreLog(lineaContemplaAsignatura);

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

  public size() {
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
