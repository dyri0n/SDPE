import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LineaAsignatura } from '@prisma/client';
import {
  GetLineaAsignaturaDTO,
  ListarLineasAsignaturaDTO,
} from './dto/listar.dto';
import {
  lineaAsignaturasGetTitulosPorPlan,
  lineaAsignaturasGetAsignaturasPorIdLinea,
  lineasAsignaturaGetIdsPorPlan,
  planesGetTitulo,
} from '@prisma/client/sql';
import {
  AsignaturaDeLinea,
  LineaConAsignaturas,
} from './dto/incluirAsignaturasDe.dto';

@Injectable()
export class LineaAsignaturaService {
  constructor(private prisma: PrismaService) {}
  async getAllLineasAsignatura(): Promise<LineaAsignatura[]> {
    const todasLasLineas = await this.prisma.lineaAsignatura.findMany();
    return todasLasLineas;
  }
  // BLOQUE DE OBTENER LINEAS DE ASIGNATURA POR PLAN
  private async getLineasPorPlan(
    idPlan: number,
  ): Promise<GetLineaAsignaturaDTO[]> {
    const lineasResultado = await this.prisma.$queryRawTyped(
      lineaAsignaturasGetTitulosPorPlan(idPlan),
    );
    return lineasResultado.map((value) => {
      return {
        idLinea: value.idLinea,
        titulo: value.titulo,
      };
    }) as GetLineaAsignaturaDTO[];
  }
  private async getTituloPlan(idPlan): Promise<string> {
    const titulo = await this.prisma.$queryRawTyped(planesGetTitulo(idPlan));
    return titulo.map((value) => {
      return value.titulo;
    })[0] as string;
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
    const tituloPlan: string = await this.getTituloPlan(idPlan);
    const lineas: GetLineaAsignaturaDTO[] = await this.getLineasPorPlan(idPlan);

    return {
      idPlan: idPlan,
      tituloPlan: tituloPlan,
      lineasAsignatura: lineas,
    } as ListarLineasAsignaturaDTO;
  }

  //BLOQUE DE LISTAR ASIGNATURAS POR LINEA
  //
  private async getLineaAsignaturaConAsignaturas(
    idPlan: number,
    idLinea: number,
  ): Promise<LineaConAsignaturas> {
    const asignaturasDeLinea = await this.prisma.$queryRawTyped(
      lineaAsignaturasGetAsignaturasPorIdLinea(idPlan, idLinea),
    );
    const tituloLinea = asignaturasDeLinea[0].titulo ?? 'No tiene';
    const asignaturas = asignaturasDeLinea.map((value) => {
      return {
        codigo: value.codigo,
        nombre: value.nombre,
        areaFormacion: value.areaFormacion,
        idAsignatura: value.idAsignatura,
      } as AsignaturaDeLinea;
    });
    return {
      titulo: tituloLinea,
      asignaturas: asignaturas,
    } as LineaConAsignaturas;
  }
  //
  private async getIdsDeLineaDePlan(idPlan: number) {
    const idsDeLinea = await this.prisma.$queryRawTyped(
      lineasAsignaturaGetIdsPorPlan(idPlan),
    );
    return idsDeLinea.map((value) => {
      return value.idLinea;
    }) as number[];
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
  ): Promise<LineaConAsignaturas[]> {
    const idsLineasDePlan: number[] = await this.getIdsDeLineaDePlan(idPlan);
    const resultadoPorLinea: LineaConAsignaturas[] = [];

    if (idsLineasDePlan.length < 1) {
      return [];
    }
    for (const idLinea of idsLineasDePlan) {
      const linea = await this.getLineaAsignaturaConAsignaturas(
        idPlan,
        idLinea,
      );
      resultadoPorLinea.push(linea);
    }
    return resultadoPorLinea;
  }
}
