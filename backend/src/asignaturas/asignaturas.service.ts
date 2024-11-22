import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AREA,
  Asignatura,
  CARACTER,
  PlanContemplaAsignatura,
  PracticaTomada,
  Tributacion,
} from '@prisma/client';
import { CursosService } from '../cursos/cursos.service';
import {
  AprobacionHistoricaGeneralDTO,
  AprobacionHistoricaPorCohorteDTO,
  AprobacionHistoricaPorTipoIngresoDTO as AprobacionHistoricaPorPlanDTO,
  DetalleAsignaturaDTO,
  ID_INGRESO_PROSECUCION,
  ID_INGRESO_REGULAR,
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
import { distinct } from 'rxjs';

@Injectable()
export class AsignaturasService {
  constructor(
    private prisma: PrismaService,
    private cursacionService: CursosService,
  ) {}

  async getAsignatura(codigoAsignatura: string): Promise<Asignatura[]> {
    return await this.prisma.asignatura.findMany({
      where: {
        codigo: codigoAsignatura,
      },
    });
  }

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

  async getAsignaturasDePlan(
    planId: number,
  ): Promise<PlanContemplaAsignatura[]> {
    const result = await this.prisma.planContemplaAsignatura.findMany({
      where: {
        idPlan: planId,
      },
      include: {
        asignatura: true,
      },
    });
    return result;
  }

  async getSiguienteDeAsignatura(asignaturaId: number): Promise<Tributacion[]> {
    return this.prisma.tributacion.findMany({
      where: { idAsignaturaRequerida: asignaturaId },
    });
  }

  async getAsignaturasPorCaracter(caracter: CARACTER): Promise<Asignatura[]> {
    return this.prisma.asignatura.findMany({
      where: { caracter: caracter },
    });
  }

  //Obtiene las asignaturas por area de formación

  async getAsignaturasPorArea(
    areaFormacion: AREA,
  ): Promise<PlanContemplaAsignatura[]> {
    return this.prisma.planContemplaAsignatura.findMany({
      where: { areaFormacion: areaFormacion },
    });
  }

  async getPromedioDeAsignatura(
    idPlan: number,
    idAsignatura: number,
  ): Promise<number> {
    const cursos = await this.cursacionService.getCursacionesDeAsignatura(
      idAsignatura,
      idPlan,
    );
    let sumador = 0;
    cursos.forEach((curso) => {
      sumador += curso.notaFinal;
    });
    //return promedio
    return cursos.length > 0 ? sumador / cursos.length : 1;
  }

  async getResultadosDeAsignaturaPractica(
    idPlan: number,
    idAsignatura: number,
  ): Promise<PracticaTomada[]> {
    return this.prisma.practicaTomada.findMany({
      where: { idPlan: idPlan, idAsignatura: idAsignatura },
    });
  }
  // Bloque de Listar Asignaturas
  //Método principal del bloque listar asignaturas
  async listarAsignaturas(): Promise<AsignaturaListadaDTO[]> {
    // retorna los datos asi como van
    const result = await this.prisma.$queryRawTyped(asignaturasListar());
    return result.map((value) => {
      return {
        tituloPlan: value.tituloPlan,
        codigoPlan: value.codigoPlan,
        fechaInstauracionPlan: value.fechaInstauracionPlan,
        codigoAsignatura: value.codigoAsignatura,
        nombreAsignatura: result.nombreAsignatura,
        nombreCortoAsignatura: result.nombreCortoAsignatura,
        semestreRealizacion: result.semestreRealizacion,
        areaFormacion: result.areaFormacion,
      };
    }) as AsignaturaListadaDTO[];
  }

  // FIN Bloque de Listar Asignaturas
  //
  //
  // Bloque de Detalles de una asignatura Histórica

  //

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
        agnio: value.agnio,
        promedio: value.promedio.toNumber(),
      };
    }) as PromedioHistoricoPorPlanDTO[];
  }

  // TODO: SEGUIR VIENDO EL PEPE
  /**
   * Retorna el prmedio de cada cohorte en los años que hayan rendido asignaturas a lo largo del tiempo
   * En este caso el año se repetiría 1 vez ya que cada cohorte tiene 2 tipos de ingreso: regular y prosecución de estudios
   * EJ: [
   *       {2024, 2021, ID_REGULAR, 5.6},
   *       {2024, 2021, ID_PROSECUCION, 6.6},
   *       {2024, 2022, ID_REGULAR, 4.6},
   *       {2024, 2022, ID_PROSECUCION, 4.6},
   *       ......
   *     ]
   * @param codigoAsignatura
   * @returns
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
        agnioIngreso: value.agnioIngreso,
        tipoIngreso: value.titulo,
        promedio: value.promedio.toNumber(),
      };
    }) as PromedioHistoricoPorCohorteDTO[];
  }

  private async getAprobacionHistoricaGeneral(
    idAsignatura: number,
  ): Promise<AprobacionHistoricaGeneralDTO[]> {
    /*
    Retorna el porcentaje de aprobación de una asignatura a lo largo del tiempo
    EJ: [{2024, 60}, {2023, 50}, {2022, 80} ....]
    */
    const result = await this.prisma.$queryRawTyped(
      asignaturasGetAprobacionesHistoricasGeneral(idAsignatura),
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
  async getAprobacionHistoricaPorCohorte(
    idAsignatura: number,
  ): Promise<AprobacionHistoricaPorCohorteDTO[]> {
    /*
    Retorna el porcentaje de aprobación de cada cohorte en los años que hayan rendido asignaturas a lo largo del tiempo
    En este caso el año se repetiría 1 vez ya que hay 2 tipos de ingreso: regular y prosecución de estudios
    EJ: [
          {2024, 2021, ID_REGULAR, 50},
          {2024, 2021, ID_PROSECUCION, 70},
          {2024, 2022, ID_REGULAR, 40},
          {2024, 2022, ID_PROSECUCION, 89}
          ......
        ]
    */
    const result = await this.prisma.$queryRawTyped(
      asignaturasGetAprobacionesHistoricasPorCohorte(idAsignatura),
    );
    return result.map((value) => {
      return {
        agnio: value.agnio,
        cohorte: value.agnioIngreso,
        tipoIngreso: value.titulo,
        aprobacion: value.aprobacion.toNumber(),
      };
    }) as AprobacionHistoricaPorCohorteDTO[];
  }
  //Método principal del bloque.
  //Retorna todos los detalles históricos de una asignatura por su ID
  async getDetalleHistoricoAsignatura(codigoAsignatura: string) {
    const planes = await this.prisma.plan.findMany({
      select: {
        codigo: true,
      },
    });

    const promediosHistoricosPorPlan = [];
    const aprobacionHistoricaPorPlan = [];

    planes.map((plan) => {
      // lista 👌👌👌
      promediosHistoricosPorPlan.push(
        this.getPromediosHistoricosPorPlan(codigoAsignatura, plan.codigo),
      );
      // lista 👌👌👌👌
      aprobacionHistoricaPorPlan.push(
        this.getAprobacionHistoricaPorPlan(codigoAsignatura, plan.codigo),
      );
    });

    // Resuelve todas las promesas usando await
    const [
      asignatura,
      promedioGeneral,
      promediosPorPlan,
      promedioPorCohortes,
      aprobacionGeneral,
      aprobacionPorPlan,
      aprobacionPorCohortes,
    ] = await Promise.all([
      this.getAsignatura(codigoAsignatura),
      this.getPromediosHistoricosGeneral(codigoAsignatura),
      ...promediosHistoricosPorPlan,
      this.getPromediosHistoricosPorCohorte(codigoAsignatura),
      this.getAprobacionHistoricaGeneral(codigoAsignatura),
      ...aprobacionHistoricaPorPlan,
      this.getAprobacionHistoricaPorCohorte(codigoAsignatura),
    ]);

    return {
      asignatura: {
        idAsignatura: asignatura.id,
        posicion: posicion,
        codigo: asignatura.codigo,
      }, // Asignatura response
      promedios: {
        general: promedioGeneral, // PromedioHistoricoGeneralDTO[]
        ingresoRegular: promedioIngresoRegular, // PromedioHistoricoPorTipoIngresoDTO[]
        ingresoProsecucion: promedioIngresoProsecucion, // PromedioHistoricoPorTipoIngresoDTO[]
        cohortes: promedioPorCohortes, // PromedioHistoricoPorCohorteDTO[]
      },
      aprobaciones: {
        general: aprobacionGeneral, // AprobacionHistoricaGeneralDTO[]
        ingresoRegular: aprobacionIngresoRegular, // AprobacionHistoricaPorTipoIngresoDTO[]
        ingresoProsecucion: aprobacionIngresoProsecucion, // AprobacionHistoricaPorTipoIngresoDTO[]
        cohortes: aprobacionPorCohortes, // AprobacionHistoricaPorCohorteDTO[]
      },
    } as DetalleAsignaturaDTO;
  }
  // FIN Bloque de Detalles de una asignatura Histórica
  //BLOQUE Tendencias de Corte práctico
  async getDetalleHistoricoAsignaturasCortePractico(): Promise<
    DetalleAsignaturaDTO[]
  > {
    const idsAsignaturasCortePractico =
      await this.prisma.planContemplaAsignatura.findMany({
        select: { idAsignatura: true, asignatura: true, posicion: true },
        where: { areaFormacion: 'FP' }, //TODO: CAMBIAR LUEGO EL PLAN
      }); //BUSCA ASIGNATURAS DE CORTE PRACTICO

    //AGREGA CADA UNO DE LOS DetalleAsignaturaDTO[] correspondientes a asignaturas de corte práctico
    const responseAsignaturas: DetalleAsignaturaDTO[] = [];
    for (const asignatura of idsAsignaturasCortePractico) {
      const detalle = await this.getDetalleHistoricoAsignatura(
        asignatura.idAsignatura,
        asignatura.posicion,
      );
      responseAsignaturas.push(detalle);
    }
    return responseAsignaturas;
  }
}
