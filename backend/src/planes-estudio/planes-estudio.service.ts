import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanDTO, ModifyPlanDTO } from './dto';
import { PlanContemplaAsignatura } from '@prisma/client';

@Injectable()
export class PlanesEstudioService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    throw new Error('Method not implemented.');
  }

  findOne(id: number) {
    return this.prisma.plan.findFirst({ where: { id: id } });
  }

  createPlan(data: CreatePlanDTO) {
    throw new Error('Method not implemented.');
  }

  deletePlan(id: number) {
    throw new Error('Method not implemented.');
  }

  modifyPlan(id: number, data: ModifyPlanDTO) {
    throw new Error('Method not implemented.');
  }

  async getFluxogram(id: number): Promise<PlanContemplaAsignatura[]> {
    return this.prisma.planContemplaAsignatura.findMany({
      where: { idPlan: id },
      include: {
        esTributadaEn: true,
      },
    });
  }
}
