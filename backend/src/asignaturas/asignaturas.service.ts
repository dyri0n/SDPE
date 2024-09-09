import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AsignaturasService {
  constructor(private prisma: PrismaService) {}

  async getAsignaturasDePLan(planId: number) {
    return this.prisma.planContemplaAsignatura.findMany({
      where: {
        idPlan: planId,
      },
    });
  }
}
