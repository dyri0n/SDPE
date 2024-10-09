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
  AprobacionHistoricaPorTipoIngresoDTO,
  DetalleAsignaturaDTO,
  ID_INGRESO_PROSECUCION,
  ID_INGRESO_REGULAR,
  PromedioHistoricoGeneralDTO,
  PromedioHistoricoPorCohorteDTO,
  PromedioHistoricoPorTipoIngresoDTO,
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

  async getAsignatura(idAsignatura: number): Promise<Asignatura> {
    return this.prisma.asignatura.findUnique({
      where: {
        id: idAsignatura,
      },
    });
  }

  async getAsignaturaContemplada(idPlan: number, idAsignatura: number) {
    const asignaturaContemplada =
      await this.prisma.planContemplaAsignatura.findUnique({
        where: {
          idPlan_idAsignatura: {
            idPlan: idPlan,
            idAsignatura: idAsignatura,
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

  //Obtiene las asignaturas por caracter
  //la idea es sacar las de corte práctico solamente
  //Hay que determinar cómo...
  async getAsignaturasPorCaracter(
    caracter: CARACTER,
  ): Promise<PlanContemplaAsignatura[]> {
    return this.prisma.planContemplaAsignatura.findMany({
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
    /*
     * Retorna información de cada asignatura independiente de su
     * plan de estudios.
     *
     * Por cada Asignatura retorna un AsignaturaListadaDTO
     * EJ:
     * {
     *  2,
     * 'FI-203',
     * 'Taller de Comunicación Oral',
     * {2, 3},
     * {2018, 2025},
     * { FP }
     * }
     * */
    const result = await this.prisma.$queryRawTyped(asignaturasListar());
    return result.map((value) => {
      return {
        idAsignatura: value.idasignatura,
        codigo: value.codigo,
        nombre: value.nombre,
        semestreRealizacion: value.semestrerealizacion,
        planesDondeSeImparte: value.planesdondeseimparte,
        formacion: value.areaformacion,
      };
    }) as AsignaturaListadaDTO[];
  }

  // FIN Bloque de Listar Asignaturas
  //
  //
  // Bloque de Detalles de una asignatura Histórica

  private async getPromediosHistoricosGeneral(
    idAsignatura: number,
  ): Promise<PromedioHistoricoGeneralDTO[]> {
    //Retorna el promedio general de cada año por separado
    //EJ : [ {2024: 5.2}, {2023: 5.1}, {2022: 4.6} ]
    const result = await this.prisma.$queryRawTyped(
      asignaturasGetPromediosHistoricosGeneral(idAsignatura),
    );
    return result.map((value) => {
      return {
        agnio: value.agnio,
        promedio: value.promedio.toNumber(),
      };
    }) as PromedioHistoricoGeneralDTO[];
  }
  private async getPromediosHistoricosPorPlan(
    idAsignatura: number,
    codigo: number,
  ): Promise<PromedioHistoricoPorTipoIngresoDTO[]> {
    //
    //Retorna el promedio por tipo de ingreso de cada año por separado
    //EJ : [ {2024: 5.2}, {2023: 5.1}, {2022: 4.6} ]
    const result = await this.prisma.$queryRawTyped(
      asignaturasGetPromediosHistoricosPorPlan(codigo, idAsignatura),
    );
    return result.map((value) => {
      return {
        agnio: value.agnio,
        promedio: value.promedio.toNumber(),
      };
    }) as PromedioHistoricoPorTipoIngresoDTO[];
  }

  private async getPromediosHistoricosPorCohorte(
    idAsignatura: number,
  ): Promise<PromedioHistoricoPorCohorteDTO[]> {
    /*
    Retorna el prmedio de cada cohorte en los años que hayan rendido asignaturas a lo largo del tiempo
    En este caso el año se repetiría 1 vez ya que cada cohorte tiene 2 tipos de ingreso: regular y prosecución de estudios
    EJ: [
          {2024, 2021, ID_REGULAR, 5.6},
          {2024, 2021, ID_PROSECUCION, 6.6},
          {2024, 2022, ID_REGULAR, 4.6},
          {2024, 2022, ID_PROSECUCION, 4.6},
          ......
        ]
    */
    const result = await this.prisma.$queryRawTyped(
      asignaturasGetPromediosHistoricosPorCohorte(idAsignatura),
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
  private async getAprobacionHistoricaPorPlan(
    idAsignatura: number,
    codigo: number,
  ): Promise<AprobacionHistoricaPorTipoIngresoDTO[]> {
    const result = await this.prisma.$queryRawTyped(
      asignaturasGetAprobacionesHistoricasPorPlan(codigo, idAsignatura),
    );
    return result.map((value) => {
      return {
        agnio: value.agnio,
        aprobacion: value.aprobacion.toNumber(),
      };
    }) as AprobacionHistoricaPorTipoIngresoDTO[];
  }
  private async getAprobacionHistoricaPorCohorte(
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
  async getDetalleHistoricoAsignatura(idAsignatura: number) {
    // Resuelve todas las promesas usando await
    const [
      asignatura,
      promedioGeneral,
      promedioIngresoRegular,
      promedioIngresoProsecucion,
      promedioPorCohortes,
      aprobacionGeneral,
      aprobacionIngresoRegular,
      aprobacionIngresoProsecucion,
      aprobacionPorCohortes,
    ] = await Promise.all([
      this.getAsignatura(idAsignatura),
      this.getPromediosHistoricosGeneral(idAsignatura),
      this.getPromediosHistoricosPorPlan(idAsignatura, ID_INGRESO_REGULAR),
      this.getPromediosHistoricosPorPlan(idAsignatura, ID_INGRESO_PROSECUCION),
      this.getPromediosHistoricosPorCohorte(idAsignatura),
      this.getAprobacionHistoricaGeneral(idAsignatura),
      this.getAprobacionHistoricaPorPlan(idAsignatura, ID_INGRESO_REGULAR),
      this.getAprobacionHistoricaPorPlan(idAsignatura, ID_INGRESO_PROSECUCION),
      this.getAprobacionHistoricaPorCohorte(idAsignatura),
    ]);

    return {
      asignatura: asignatura, // Asignatura response
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
}
