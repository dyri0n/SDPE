import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AREA,
  Asignatura,
  PlanContemplaAsignatura,
  Tributacion,
} from '@prisma/client';
import { CursosService } from '../cursos/cursos.service';

@Injectable()
export class AsignaturasService {
  constructor(
    private prisma: PrismaService,
    private cursacionService: CursosService,
  ) {}

  async getAsignaturasDePLan(
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

  //Obtiene las asignaturas por area de formación
  //la idea es sacar las de corte práctico solamente
  //Hay que determinar cómo...
  async getAsignaturasPorArea(areaFormacion: AREA): Promise<Asignatura[]> {
    return this.prisma.planContemplaAsignatura.findMany({
      where: { areaFormacion: areaFormacion },
    });
  }

  async getPromedioDeAsignatura(idAsignatura: number, idPlan: number) {
    //no se pone el prettier pq no está sincronizado con el prisma
    const cursos = await this.cursacionService.getCursacionesDeAsignatura(
      idAsignatura,
      idPlan,
    );
    let sumador = 0;
    cursos.forEach((curso) => {
      sumador += curso.nota;
    });
    //return promedio
    return cursos.length > 0 ? sumador / cursos.length : 1;
  }
}
