import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AREA, Asignatura, CARACTER, PracticaTomada } from '@prisma/client';
import { CursosService } from '../cursos/cursos.service';
import {
  AprobacionHistoricaGeneralDTO,
  AprobacionHistoricaPorCohorteDTO,
  AprobacionHistoricaPorTipoIngresoDTO as AprobacionHistoricaPorPlanDTO,
  DetalleAsignaturaDTO,
  PromedioHistoricoGeneralDTO,
  PromedioHistoricoPorCohorteDTO,
  PromedioHistoricoPorPlanDTO,
} from './dto/detalles.dto';
import { AsignaturaListadaDTO } from './dto/listar.dto';
import {
  asignaturasListar,
  asignaturasGetPromediosHistoricosGeneral,
  asignaturasGetPromediosHistoricosPorPlan,
  asignaturasGetPromediosHistoricosPorCohorte,
  asignaturasGetAprobacionesHistoricasGeneral,
  asignaturasGetAprobacionesHistoricasPorPlan,
  asignaturasGetAprobacionesHistoricasPorCohorte,
} from '@prisma/client/sql';

@Injectable()
export class AsignaturasService {
  constructor(
    private prisma: PrismaService,
    private cursacionService: CursosService,
  ) {}

  /**
   * Retorna las instancias de asignaturas en distintos planes según el código
   * @param codigoAsignatura Código de la asignatura
   * @returns {Asignatura[]} Asignaturas con el mismo código en distintos planes
   */
  async getAsignatura(codigoAsignatura: string): Promise<Asignatura[]> {
    return await this.prisma.asignatura.findMany({
      where: {
        codigo: codigoAsignatura,
      },
      include: {
        PlanDeEstudio: true,
      },
    });
  }

  /**
   * Retorna una sola instancia de asignatura en un plan específico según el código
   * @param idPlan Identificador del plan
   * @param codigoAsignatura Código de la asignatura
   * @returns {Asignatura} Asignatura especificada
   */
  async getAsignaturaDePlan(idPlan: number, codigoAsignatura: string) {
    const asignaturaContemplada = await this.prisma.asignatura.findUnique({
      where: {
        codigoPorPlanUnico: {
          idPlan: idPlan,
          codigo: codigoAsignatura,
        },
      },
    });

    return asignaturaContemplada;
  }

  /**
   * Retorna el conjunto de asignaturas pertenecientes a un plan
   * @param planId Identificador del plan
   * @returns {Asignatura[]} Asignaturas del plan
   */
  async getAsignaturasDePlan(planId: number): Promise<Asignatura[]> {
    const asignaturasDelPlan = await this.prisma.asignatura.findMany({
      where: {
        idPlan: planId,
      },
    });

    return asignaturasDelPlan;
  }

  /**
   * Retorna las asignaturas que tienen un cierto carácter descrito
   * @param caracter El carácter a consultar
   * @returns {Asignatura[]} Asignaturas con el carácter descrito
   */
  async getAsignaturasPorCaracter(caracter: CARACTER): Promise<Asignatura[]> {
    return await this.prisma.asignatura.findMany({
      where: { caracter: caracter },
    });
  }

  /**
   * Retorna las asignaturas que siguen una cierta área de formación
   * @param areaFormacion Área de formación a consultar
   * @returns {Asignatura[]} Asignaturas que siguen la área
   */
  async getAsignaturasPorArea(areaFormacion: AREA): Promise<Asignatura[]> {
    return await this.prisma.asignatura.findMany({
      where: { areaFormacion: areaFormacion },
    });
  }

  /**
   * @deprecated No tiene uso
   */
  async getPromedioDeAsignatura(
    idPlan: number,
    idAsignatura: number,
  ): Promise<number> {
    const cursos = await this.cursacionService.getCursacionesPorIdAsignatura(
      idAsignatura,
      idPlan,
    );

    let sumador = 0;
    cursos.forEach((curso) => {
      sumador += curso.notaFinal;
    });

    const promedio = cursos.length > 0 ? sumador / cursos.length : 1;

    return promedio;
  }

  /**
   * @deprecated No tiene uso
   */
  async getResultadosDeAsignaturaPractica(
    idPlan: number,
    idAsignatura: number,
  ): Promise<PracticaTomada[]> {
    return await this.prisma.practicaTomada.findMany({
      where: { idPlan: idPlan, idAsignatura: idAsignatura },
    });
  }

  /**
   * Retorna las asignaturas inscritas en el sistema de manera listada
   * @returns {AsignaturaListadaDTO[]} Asignaturas listadas
   */
  async listarAsignaturas(): Promise<AsignaturaListadaDTO[]> {
    // retorna los datos asi como van
    const result = await this.prisma.$queryRawTyped(asignaturasListar());

    console.log(result);

    return result.map((v) => {
      return { ...v };
    }) as AsignaturaListadaDTO[];
  }

  // Bloque de Detalles de una asignatura Histórica

  /**
   * Retorna el promedio general (de todos los planes) por cada año por separado
   *
   * EJ : [ {2024: 5.2}, {2023: 5.1}, {2022: 4.6} ]
   * @param codigoAsignatura Código de la Asignatura
   * @returns {PromedioHistoricoGeneralDTO[]}
   */
  private async getPromediosHistoricosGeneral(
    codigoAsignatura: string,
  ): Promise<PromedioHistoricoGeneralDTO[]> {
    const result = await this.prisma.$queryRawTyped(
      asignaturasGetPromediosHistoricosGeneral(codigoAsignatura),
    );

    return result.map((value) => {
      return {
        agnio: value.agnio,
        promedio: value.promedio.toNumber(),
      };
    }) as PromedioHistoricoGeneralDTO[];
  }

  /**
   * Retorna los promedios históricos por plan de estudios, utilizando el código de la asignatura y del plan
   * @param codigoAsignatura Código de la asignatura
   * @param codigoPlan Código del plan
   * @returns {PromedioHistoricoPorPlanDTO[]}
   */
  private async getPromediosHistoricosPorPlan(
    codigoAsignatura: string,
    codigoPlan: number,
  ): Promise<PromedioHistoricoPorPlanDTO[]> {
    //
    //Retorna el promedio por tipo de ingreso de cada año por separado
    //EJ : [ {2024: 5.2}, {2023: 5.1}, {2022: 4.6} ]
    const result = await this.prisma.$queryRawTyped(
      asignaturasGetPromediosHistoricosPorPlan(codigoAsignatura, codigoPlan),
    );

    return result.map((value) => {
      return {
        codigoPlan: codigoPlan,
        agnio: value.agnio,
        promedio: value.promedio.toNumber(),
      };
    }) as PromedioHistoricoPorPlanDTO[];
  }

  /**
   * Retorna el promedio de la asignatura según
   * cada cohorte que la ha dado, dependiendo del
   * plan y en los años que hayan rendido asignaturas
   * a lo largo del tiempo
   *
   * EJ: [
   *       {agnio: 2024, cohorte: 2021, plan: "2019 Regular", promedio: 5.6},
   *       {agnio: 2024, cohorte: 2021, plan: "2019 Prosecucion", promedio: 6.6},
   *       {agnio: 2024, cohorte: 2022, plan: "2019 Regular", promedio: 4.6},
   *       {agnio: 2024, cohorte: 2022, plan: "2019 Prosecucion", promedio: 5.3},
   *       ...
   *     ]
   * @param codigoAsignatura Código de la asignatura
   * @returns {PromedioHistoricoPorCohorteDTO[]}
   */
  private async getPromediosHistoricosPorCohorte(
    codigoAsignatura: string,
  ): Promise<PromedioHistoricoPorCohorteDTO[]> {
    const result = await this.prisma.$queryRawTyped(
      asignaturasGetPromediosHistoricosPorCohorte(codigoAsignatura),
    );

    return result.map((value) => {
      return {
        agnio: value.agnio,
        cohorte: value.agnioIngreso,
        plan: value.titulo,
        promedio: value.promedio.toNumber(),
      };
    }) as PromedioHistoricoPorCohorteDTO[];
  }

  /**
   * Retorna el porcentaje de aprobación de una asignatura según su código
   * a lo largo del tiempo, independiente de los planes en los que pueda estar
   *
   * EJ: [{agnio: 2024, aprobacion: 60},
   *      {agnio: 2023, aprobacion: 50},
   *      ...]
   * @param codigoAsignatura Código de la Asignatura
   * @returns {AprobacionHistoricaGeneralDTO[]} Arreglo de años junto a su aprobación general
   */
  private async getAprobacionHistoricaGeneral(
    codigoAsignatura: string,
  ): Promise<AprobacionHistoricaGeneralDTO[]> {
    const result = await this.prisma.$queryRawTyped(
      asignaturasGetAprobacionesHistoricasGeneral(codigoAsignatura),
    );

    return result.map((value) => {
      return {
        agnio: value.agnio,
        aprobacion: value.aprobacion.toNumber(),
      };
    }) as AprobacionHistoricaGeneralDTO[];
  }

  /**
   * Retorna los porcentajes de aprobación históricos por plan de estudios, utilizando el código de la asignatura y del plan
   * @param codigoAsignatura Código de la asignatura
   * @param codigoPlan Código del plan
   * @returns {AprobacionHistoricaPorPlanDTO[]}
   */
  private async getAprobacionHistoricaPorPlan(
    codigoAsignatura: string,
    codigoPlan: number,
  ): Promise<AprobacionHistoricaPorPlanDTO[]> {
    const result = await this.prisma.$queryRawTyped(
      asignaturasGetAprobacionesHistoricasPorPlan(codigoAsignatura, codigoPlan),
    );

    return result.map((value) => {
      return {
        agnio: value.agnio,
        aprobacion: value.aprobacion.toNumber(),
      };
    }) as AprobacionHistoricaPorPlanDTO[];
  }

  /**
   * Retorna el porcentaje de aprobación de cada cohorte en los años que hayan rendido asignaturas a lo largo del tiempo
   * En este caso el año se repetiría 1 vez ya que hay 2 tipos de ingreso: regular y prosecución de estudios
   * EJ: [
   *      {
   *        agnio: 2024,
   *        cohorte 2021,
   *        plan: PLAN_1,
   *        aprobacion: 50
   *      },
   *      {
   *        agnio: 2024,
   *        cohorte: 2021,
   *        plan: PLAN_2,
   *        70
   *      },
   *      ...
   *     ]
   * @param codigoAsignatura
   * @returns
   */
  async getAprobacionHistoricaPorCohorte(
    codigoAsignatura: string,
  ): Promise<AprobacionHistoricaPorCohorteDTO[]> {
    const result = await this.prisma.$queryRawTyped(
      asignaturasGetAprobacionesHistoricasPorCohorte(codigoAsignatura),
    );

    return result.map((value) => {
      return {
        agnio: value.agnio,
        cohorte: value.agnioIngreso,
        plan: value.titulo,
        aprobacion: value.aprobacion.toNumber(),
      };
    }) as AprobacionHistoricaPorCohorteDTO[];
  }

  /**
   * Compilado de múltiples queries para el detalle estadístico de rendimiento
   * de una asignatura específica, considerando los planes en los que participa,
   * los cohortes que la han cursado y también un reporte anual general.
   * @param codigoAsignatura Código de la asignatura
   * @returns {DetalleAsignaturaDTO} Detalle estadístico de la asignatura
   */
  async getDetalleHistoricoAsignatura(codigoAsignatura: string) {
    const planes = await this.prisma.plan.findMany({
      select: {
        codigo: true,
      },
    });

    const promediosHistoricosPorPlanPromises = planes.map((plan) =>
      this.getPromediosHistoricosPorPlan(codigoAsignatura, plan.codigo),
    );

    const aprobacionHistoricaPorPlanPromises = planes.map((plan) =>
      this.getAprobacionHistoricaPorPlan(codigoAsignatura, plan.codigo),
    );

    const asignaturasPromise = this.getAsignatura(codigoAsignatura);

    const promediosAprobacionesPromises = [
      this.getPromediosHistoricosGeneral(codigoAsignatura),
      this.getPromediosHistoricosPorCohorte(codigoAsignatura),
      this.getAprobacionHistoricaGeneral(codigoAsignatura),
      this.getAprobacionHistoricaPorCohorte(codigoAsignatura),
    ];

    const [
      asignaturasPorPlan,
      promediosHistoricosPorPlan,
      aprobacionHistoricaPorPlan,
      [
        promedioGeneral,
        promedioPorCohortes,
        aprobacionGeneral,
        aprobacionPorCohortes,
      ],
    ] = await Promise.all([
      asignaturasPromise,
      Promise.all(promediosHistoricosPorPlanPromises),
      Promise.all(aprobacionHistoricaPorPlanPromises),
      Promise.all(promediosAprobacionesPromises),
    ]);

    return {
      asignaturas: asignaturasPorPlan,
      promedios: {
        general: promedioGeneral,
        cohortes: promedioPorCohortes,
        promediosPorPlan: promediosHistoricosPorPlan,
      },
      aprobaciones: {
        general: aprobacionGeneral,
        cohortes: aprobacionPorCohortes,
        aprobacionesPorPlan: aprobacionHistoricaPorPlan,
      },
    } as DetalleAsignaturaDTO;
  }

  // FIN Bloque de Detalles de una asignatura Histórica

  //BLOQUE Tendencias de Corte práctico

  //todo
  async getDetalleHistoricoAsignaturasCortePractico(): Promise<
    DetalleAsignaturaDTO[]
  > {
    const idsAsignaturasCortePractico = await this.prisma.asignatura.findMany({
      where: {
        caracter: 'PRACTICA',
      }, //TODO: CAMBIAR LUEGO EL PLAN
      select: {
        codigo: true,
        idPlan: false,
      },
    }); //BUSCA ASIGNATURAS DE CORTE PRACTICO

    console.log(idsAsignaturasCortePractico);

    //AGREGA CADA UNO DE LOS DetalleAsignaturaDTO[] correspondientes a asignaturas de corte práctico
    const responseAsignaturas: Promise<DetalleAsignaturaDTO>[] = [];

    for (const asignatura of idsAsignaturasCortePractico) {
      const detalle = this.getDetalleHistoricoAsignatura(asignatura.codigo);
      responseAsignaturas.push(detalle);
    }

    const response = Promise.all(responseAsignaturas);

    return response;
  }
}
