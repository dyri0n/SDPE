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
  DetalleAsignaturaDTO,
  ID_INGRESO_PROSECUCION,
  ID_INGRESO_REGULAR,
  PromedioHistoricoGeneralDTO,
  PromedioHistoricoPorCohorteDTO,
  PromedioHistoricoPorTipoIngresoDTO,
} from './dto/detalles.dto';

@Injectable()
export class AsignaturasService {
  constructor(
    private prisma: PrismaService,
    private cursacionService: CursosService,
  ) {}

  async getAsignatura(idAsignatura: number): Promise<Asignatura> {
    const asignatura = await this.prisma.asignatura.findUnique({
      where: {
        id: idAsignatura,
      },
    });

    return asignatura;
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

  // Bloque de Detalles de una asignatura Histórica

  private async getPromediosHistoricosGeneral(
    idAsignatura: number,
  ): Promise<PromedioHistoricoGeneralDTO[]> {
    //Retorna el promedio general de cada año por separado
    //EJ : [ {2024: 5.2}, {2023: 5.1}, {2022: 4.6} ]
    return this.prisma.$queryRaw`
    SELECT agnio, avg(notaFinal) AS promedio
    FROM PLANCONTEMPLAASIGNATURA pt 
        JOIN CURSACION c ON (c.idAsignatura = pt.idAsignatura AND pt.idAsignatura = ${idAsignatura})
    GROUP BY agnio
    `;
  }
  private async getPromediosHistoricosPorTipoDeIngreso(
    idAsignatura: number,
    idIngreso: number,
  ): Promise<PromedioHistoricoPorTipoIngresoDTO[]> {
    //TODO: Decidir cómo se guarda el tipo de ingreso de estudiante, el tipo de ingreso puede estar en el plan o en el estudiante
    //
    //Retorna el promedio por tipo de ingreso de cada año por separado
    //EJ : [ {2024: 5.2}, {2023: 5.1}, {2022: 4.6} ]
    return this.prisma.$queryRaw`
    SELECT agnio, avg(notaFinal) AS promedio
    FROM PLANCONTEMPLAASIGNATURA pt 
        JOIN CURSACION c ON (c.idAsignatura = pt.idAsignatura AND pt.idAsignatura = ${idAsignatura})
        --
        JOIN PLAN p on (p.id = pt.idPlan AND p.idIngresoRegular = ${idIngreso})
    GROUP BY agnio
    `;
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
    return this.prisma.$queryRaw`
    SELECT agnio, agnioIngreso, idIngresoRegular, avg(notaFinal) AS promedio
    FROM PLANCONTEMPLAASIGNATURA pt 
        JOIN CURSACION c ON (c.idAsignatura = pt.idAsignatura AND pt.idAsignatura = ${idAsignatura})
        --
        JOIN ESTUDIANTE e on (e.rut = c.estudianteRut)
        --
        JOIN PLAN p on (p.id = pt.idPlan)
    GROUP BY agnio, agnioIngreso, idIngresoRegular
    `;
  }

  private async getAprobacionHistoricaGeneral(idAsignatura: number) {
    /*
    Retorna el porcentaje de aprobación de una asignatura a lo largo del tiempo
    EJ: [{2024, 60}, {2023, 50}, {2022, 80} ....]
    */
    return this.prisma.$queryRaw`
    SELECT agnio, 
           (sum(CASE WHEN notaFinal >= 4.0 THEN 1 END) / count(1))*100 as aprobacion
    FROM PLANCONTEMPLAASIGNATURA pt
        JOIN CURSACION c ON (c.idAsignatura = pt.idAsignatura AND pt.idAsignatura = ${idAsignatura})
    GROUP BY agnio
    `;
  }
  private async getAprobacionHistoricaPorTipoIngreso(
    idAsignatura: number,
    idIngreso: number,
  ) {
    return this.prisma.$queryRaw`
    SELECT agnio,
        (sum(CASE WHEN notaFinal >= 4.0 THEN 1 END) / count(1))*100 as aprobacion
    FROM PLANCONTEMPLAASIGNATURA pt 
        JOIN CURSACION c ON (c.idAsignatura = pt.idAsignatura AND pt.idAsignatura = ${idAsignatura})
        --
        JOIN PLAN p on (p.id = pt.idPlan AND p.idIngresoRegular = ${idIngreso})
    GROUP BY agnio
    `;
  }
  private async getAprobacionHistoricaPorCohorte(idAsignatura: number) {
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
    return this.prisma.$queryRaw`
    SELECT agnio, 
           agnioIngreso,
           idIngresoRegular, 
           (sum(CASE WHEN notaFinal >= 4.0 THEN 1 END) / count(1))*100 as aprobacion
    FROM PLANCONTEMPLAASIGNATURA pt 
        JOIN CURSACION c ON (c.idAsignatura = pt.idAsignatura AND pt.idAsignatura = ${idAsignatura})
        --
        JOIN ESTUDIANTE e on (e.rut = c.estudianteRut)
        --
        JOIN PLAN p on (p.id = pt.idPlan)
    GROUP BY agnio, agnioIngreso, idIngresoRegular
    `;
  }
  //Método principal del bloque.
  //Retorna todos los detalles históricos de una asignatura por su ID
  async getDetalleHistoricoAsignatura(
    idAsignatura: number,
  ): Promise<DetalleAsignaturaDTO> {
    const idRegular = ID_INGRESO_REGULAR;
    const idProsecucion = ID_INGRESO_PROSECUCION;
    return {
      asignatura: await this.getAsignatura(idAsignatura),
      promedios: {
        general: await this.getPromediosHistoricosGeneral(idAsignatura),
        ingresoRegular: await this.getPromediosHistoricosPorTipoDeIngreso(
          idAsignatura,
          idRegular,
        ),
        ingresoProsecucion: await this.getPromediosHistoricosPorTipoDeIngreso(
          idAsignatura,
          idProsecucion,
        ),
        cohortes: await this.getPromediosHistoricosPorCohorte(idAsignatura),
      },
      aprobaciones: {
        general: await this.getAprobacionHistoricaGeneral(idAsignatura),
        ingresoRegular: await this.getAprobacionHistoricaPorTipoIngreso(
          idAsignatura,
          idRegular,
        ),
        ingresoProsecucion: await this.getAprobacionHistoricaPorTipoIngreso(
          idAsignatura,
          idProsecucion,
        ),
        cohortes: await this.getAprobacionHistoricaPorCohorte(idAsignatura),
      },
    } as Promise<DetalleAsignaturaDTO>;
  }
  // FIN Bloque de Detalles de una asignatura Histórica
}
