import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlanContemplaAsignatura, Tributacion } from '@prisma/client';
import { ReadPlanContemplaDto } from '../asignatura-contemplada/dto/read-plan-contempla.dto';

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
}
