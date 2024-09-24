import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AREA,
  CARACTER,
  PlanContemplaAsignatura,
  PracticaTomada,
  Tributacion,
} from '@prisma/client';
import { CursosService } from '../cursos/cursos.service';

@Injectable()
export class AsignaturasService {
  constructor(
    private prisma: PrismaService,
    private cursacionService: CursosService,
  ) {}

  async getAsignatura(idAsignatura: number) {
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
}
