import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Asignatura,
  PlanContemplaAsignatura,
  Tributacion,
} from '@prisma/client';
//NO SE COMO IMPORTAR DESDE EL PRISMA EL ENUM ASI Q LO COPIE ABAJO
//import { AREA } from '@prisma/'

@Injectable()
export class AsignaturasService {
  constructor(private prisma: PrismaService) {}

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
    return this.prisma.planContemplaAsignatura
      .findMany
      //{
      //where: { areaFormacion: areaFormacion },
      //}
      ();
  }
}

enum AREA {
  FP,
  FG,
  FB,
  FE,
}
