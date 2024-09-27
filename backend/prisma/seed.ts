import {
  AREA,
  Asignatura,
  CARACTER,
  Estudiante,
  Plan,
  PlanContemplaAsignatura,
  PrismaClient,
  Tributacion,
} from '@prisma/client';
import * as constants from './seed-constants';
import * as util from 'util';
const prisma = new PrismaClient();
async function main() {
  const estudiantesInsertados = [];
  for (const estudiante of constants.ESTUDIANTES) {
    estudiantesInsertados.push(
      await prisma.estudiante.upsert({
        where: {
          rut: estudiante.rut,
        },
        update: {
          nombreCompleto: estudiante.nombreCompleto,
        },
        create: {
          rut: estudiante.rut,
          nombreCompleto: estudiante.nombreCompleto,
        },
      }),
    );
  }
  moreLog({ estudiantes: estudiantesInsertados });

  const asignaturasInsertadas = [];
  for (const asignatura of constants.ASIGNATURAS) {
    asignaturasInsertadas.push(
      await prisma.asignatura.upsert({
        where: {
          codigo: asignatura.codigo,
        },
        update: {
          codigo: asignatura.codigo,
          nombre: asignatura.nombre,
          descripcion: asignatura.descripcion,
          unidad: asignatura.unidad,
          linkSyllabus: asignatura.linkSyllabus,
        },
        create: {
          id: asignatura.id,
          codigo: asignatura.codigo,
          nombre: asignatura.nombre,
          descripcion: asignatura.descripcion,
          unidad: asignatura.unidad,
          linkSyllabus: asignatura.linkSyllabus,
        },
      }),
    );
  }
  moreLog({ asignaturas: asignaturasInsertadas });

  await prisma.plan.deleteMany();

  const planesInsertados = [];
  for (const plan of constants.PLANES) {
    planesInsertados.push(
      await prisma.plan.upsert({
        where: { titulo: plan.titulo },
        update: {
          titulo: plan.titulo,
          anio: plan.anio,
          fechaInstauracion: plan.fechaInstauracion,
        },
        create: {
          titulo: plan.titulo,
          anio: plan.anio,
          fechaInstauracion: plan.fechaInstauracion,
        },
      }),
    );
  }
  moreLog({ planes: planesInsertados });

  const planesDeEstudio: Plan[] = await prisma.plan.findMany();
  const asignaturas: Asignatura[] = await prisma.asignatura.findMany();

  // await prisma.planContemplaAsignatura.deleteMany()
  // se puede borrar pero no es necesario a menos de que cambien el numero de planes y asignaturas

  console.info('Comienzo seeding asignaturas contempladas');
  console.time('ASIGNATURAS CONTEMPLADAS SEEDING');
  const asignaturasContempladasInsertadas = [];
  for (const plan of planesDeEstudio) {
    let cuentaPosicion = 0;

    for (const asignatura of asignaturas) {
      asignaturasContempladasInsertadas.push(
        await prisma.planContemplaAsignatura.upsert({
          where: {
            idPlan_idAsignatura: {
              idPlan: plan.id,
              idAsignatura: asignatura.id,
            },
          },
          update: {},
          create: {
            caracter: constants.getRandomEnumValue(CARACTER),
            areaFormacion: constants.getRandomEnumValue(AREA),
            semestre: Math.floor(Math.random() * 10),
            posicion: cuentaPosicion++,
            idPlan: plan.id,
            idAsignatura: asignatura.id,
          },
        }),
      );
    }
  }
  moreLog({ asignaturasContempladas: asignaturasContempladasInsertadas });
  console.timeEnd('ASIGNATURAS CONTEMPLADAS SEEDING');

  const cursaciones = [];

  const estudiantes: Estudiante[] = await prisma.estudiante.findMany();

  console.info('Comienzo seeding cursaciones');
  console.time('CURSACIONES SEEDING');

  // borrar datos de prueba
  await prisma.cursacion.deleteMany();
  console.log('Cursaciones previas borradas');

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
        nroIntentos > 1 ? console.info(`NRO INTENTOS: ${nroIntentos}`) : null;

        for (
          let intentoActual = 1;
          intentoActual <= nroIntentos;
          intentoActual++
        ) {
          const nota =
            nroIntentos == intentoActual
              ? roundTo(Math.random() * 3 + 4, 2)
              : roundTo(Math.random() * 3 + 1, 2);

          const cursacion = await prisma.cursacion.upsert({
            where: {
              id_estudianteRut_idAsignatura_idPlan: {
                id: cursacionId,
                estudianteRut: estudiante.rut,
                idAsignatura: asignaturasContemplada.idAsignatura,
                idPlan: asignaturasContemplada.idPlan,
              },
            },
            update: {},
            create: {
              id: cursacionId,
              agnio: 2024,
              notaFinal: nota,
              grupo: Math.random() > 0.5 ? 'A' : 'B',
              numIntento: intentoActual,

              idPlan: asignaturasContemplada.idPlan,
              idAsignatura: asignaturasContemplada.idAsignatura,
              estudianteRut: estudiante.rut,
            },
          });

          moreLog({ cursacion });
          cursaciones.push(cursacion);
          cursacionId++;
        }
      }
    }
  }
  console.timeEnd('CURSACIONES SEEDING');

  console.log('Se estan seedeando las tributaciones');
  console.time('TRIBUTACIONES SEEDING');
  const tributaciones: Tributacion[] = [];
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
        tributaciones.push(
          await prisma.tributacion.upsert({
            where: {
              idPlan_idAsignaturaTributada_idAsignaturaRequerida: {
                idPlan: plan.id,
                idAsignaturaRequerida: id,
                idAsignaturaTributada: asigCont.idAsignatura,
              },
            },
            update: {},
            create: {
              idPlan: plan.id,
              idAsignaturaTributada: id,
              idAsignaturaRequerida: asigCont.idAsignatura,
            },
          }),
        );
      }

      moreLog({
        asignaturaContemplada: asigCont,
        nroPrerrequisitos,
        idAsig: asignaturasPrevias.map((ap) => ap.idAsignatura),
        codigosSeleccionadosPrerrequisitos,
      });
    }
  }

  moreLog({ tributaciones });
  console.timeEnd('TRIBUTACIONES SEEDING');
}

const moreLog = function (obj: any): void {
  console.log(util.inspect(obj, true, null, true));
};

const roundTo = function (num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
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
