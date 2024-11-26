import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LineaAsignatura } from '@prisma/client';
import { lineaAsignaturasGetAsignaturasPorIdLinea } from '@prisma/client/sql';
import {
  GetLineaAsignaturaDTO,
  ListarLineasAsignaturaDTO,
  AsignaturaDeLinea,
  LineaConAsignaturas,
} from './dto';

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
}
