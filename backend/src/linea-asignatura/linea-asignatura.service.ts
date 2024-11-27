import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LineaAsignatura } from '@prisma/client';
import { lineaAsignaturasGetAsignaturasPorIdLinea } from '@prisma/client/sql';
import {
  GetLineaAsignaturaDTO,
  ListarLineasAsignaturaDTO,
  AsignaturaDeLinea,
  LineaConAsignaturas,
  ActualizarDatosLineaDTO,
} from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class LineaAsignaturaService {
  constructor(private prisma: PrismaService) {}

  private SIN_LINEA: string = 'SIN LINEA';

  async getAllLineasAsignatura(): Promise<LineaAsignatura[]> {
    return this.prisma.lineaAsignatura.findMany();
  }

  // BLOQUE DE OBTENER LINEAS DE ASIGNATURA POR PLAN

  private async getLineasPorPlan(
    idPlan: number,
  ): Promise<GetLineaAsignaturaDTO[]> {
    const lineasResultado = await this.prisma.lineaAsignatura.findMany({
      where: {
        Asignatura: {
          some: {
            idPlan: idPlan,
          },
        },
      },
    });

    return lineasResultado as GetLineaAsignaturaDTO[];
  }

  /*
   * Método Principal del bloque
   *
   * Trae todas las lineas asociadas a un plan de estudios usando
   * ListarLineasAsignaturaDTO
   * {
   *   idPlan,
   *   tituloPlan,
   *   lineasAsignatura: [
   *     {idLinea, titulo},
   *     {idLinea, titulo}....
   *   ]
   * }
   * */
  async getAllLineasAsignaturasDePlan(idPlan: number) {
    const resultadoTituloPlan = await this.prisma.plan.findUnique({
      where: { idPlan: idPlan },
      select: { titulo: true },
    });

    if (!resultadoTituloPlan)
      throw new NotFoundException('El plan solicitado no existe');

    const lineas: GetLineaAsignaturaDTO[] = await this.getLineasPorPlan(idPlan);

    return {
      idPlan: idPlan,
      tituloPlan: resultadoTituloPlan.titulo,
      lineasAsignatura: lineas,
    } as ListarLineasAsignaturaDTO;
  }

  //BLOQUE DE LISTAR ASIGNATURAS POR LINEA

  private async getLineaAsignaturaConAsignaturas(
    idPlan: number,
  ): Promise<AsignaturaDeLinea[]> {
    const asignaturasDeLinea = await this.prisma.$queryRawTyped(
      lineaAsignaturasGetAsignaturasPorIdLinea(idPlan),
    );

    return asignaturasDeLinea.map((value) => {
      return {
        titulo: value.titulo ?? this.SIN_LINEA,
        codigo: value.codigo,
        nombre: value.nombre,
        areaFormacion: value.areaFormacion,
        idAsignatura: value.idAsignatura,
      } as AsignaturaDeLinea;
    });
  }

  /*
   * Método Principal del Bloque
   *
   * Retorna un listado de LineaConAsignatura, donde se muestra por cada DTO:
   * {
   *  titulo: string,
   *  asignaturas: AsignaturaDeLinea[]
   * }
   *
   * y AsingaturaDeLinea:
   * {
   *  codigo: string,
   *  nombre: string,
   *  areaFormacion: string
   * }
   * */
  async getLineasConAsignaturasDePlan(
    idPlan: number,
  ): Promise<LineaConAsignaturas> {
    const hashMapLineaConAsignatura: Record<string, AsignaturaDeLinea[]> = {};

    const resultadoPorLinea: AsignaturaDeLinea[] =
      await this.getLineaAsignaturaConAsignaturas(idPlan);

    resultadoPorLinea.forEach((asignatura) => {
      if (!hashMapLineaConAsignatura[asignatura.titulo]) {
        hashMapLineaConAsignatura[asignatura.titulo] = [];
      }
      hashMapLineaConAsignatura[asignatura.titulo].push(asignatura);
    });

    return hashMapLineaConAsignatura as LineaConAsignaturas;
  }

  async findOne(idLinea: number) {
    const lineaEncontrada = await this.prisma.lineaAsignatura.findUnique({
      where: {
        idLinea: idLinea,
      },
    });

    return lineaEncontrada;
  }

  async crearLinea(tituloLinea: string) {
    try {
      const lineaCreada = await this.prisma.lineaAsignatura.create({
        data: {
          titulo: tituloLinea,
        },
      });

      return lineaCreada;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credenciales duplicadas');
        }
      } else {
        throw error;
      }
    }
  }

  async borrarLinea(idLinea: number) {
    try {
      const lineaBorrada = await this.prisma.lineaAsignatura.delete({
        where: {
          idLinea: idLinea,
        },
      });

      return lineaBorrada;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('La línea proporcionada no existe');
        }
      } else {
        throw error;
      }
    }
  }

  async actualizarLinea(idLinea: number, tituloNuevoLinea: string) {
    try {
      const lineaActualizada = await this.prisma.lineaAsignatura.update({
        where: {
          idLinea: idLinea,
        },
        data: {
          titulo: tituloNuevoLinea,
        },
      });

      return lineaActualizada;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundException('La línea no existe');
        }
      }
    }
  }

  /**
   * Permite actualizar las líneas de asignaturas del plan especificado
   * Las asignaturas se
   * */
  async updateDatosLineaPorPlan(idPlan: number, data: ActualizarDatosLineaDTO) {
    const lineasUpdateQueries = [];

    for (const asignaturaLineaNueva of data.lineasNuevas) {
      if (!asignaturaLineaNueva.tituloLineaRelacionada) {
        lineasUpdateQueries.push(
          this.prisma.asignatura.update({
            where: {
              codigoPorPlanUnico: {
                idPlan: idPlan,
                codigo: asignaturaLineaNueva.codigoAsignatura,
              },
            },
            data: {
              LineaContemplaAsignatura: {
                disconnect: true,
              },
            },
          }),
        );
      } else {
        lineasUpdateQueries.push(
          this.prisma.asignatura.update({
            where: {
              codigoPorPlanUnico: {
                idPlan: idPlan,
                codigo: asignaturaLineaNueva.codigoAsignatura,
              },
            },
            data: {
              LineaContemplaAsignatura: {
                connectOrCreate: {
                  create: {
                    titulo: asignaturaLineaNueva.tituloLineaRelacionada,
                  },
                  where: {
                    titulo: asignaturaLineaNueva.tituloLineaRelacionada,
                  },
                },
              },
            },
            include: {
              LineaContemplaAsignatura: {
                select: {
                  titulo: true,
                },
              },
            },
          }),
        );
      }
    }

    const result = await Promise.all(lineasUpdateQueries);

    return result;
  }
}
