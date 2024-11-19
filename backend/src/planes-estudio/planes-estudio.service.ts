import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanDTO, ModifyPlanDTO } from './dto';
import { Asignatura } from '@prisma/client';

@Injectable()
export class PlanesEstudioService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.plan.findMany();
  }

  async findOne(idPlan: number) {
    return await this.prisma.plan.findUnique({
      where: {
        idPlan: idPlan,
      },
    });
  }

  createPlan(data: CreatePlanDTO) {
    throw new Error('Method not implemented.');
  }

  deletePlan(idPlan: number) {
    throw new Error('Method not implemented.');
  }

  modifyPlan(idPlan: number, data: ModifyPlanDTO) {
    throw new Error('Method not implemented.');
  }

  async getFluxogram(idPlan: number): Promise<Asignatura[]> {
    return this.prisma.asignatura.findMany({
      where: { idPlan: idPlan },
    });
  }

  async getLineasDeAsignaturas(idPlan: number) {
    return this.prisma.lineaAsignatura.findMany({
      where: {
        Asignatura: {
          some: {
            idPlan: idPlan,
          },
        },
      },
    });
  }

  async findOneLineaAsignatura(idPlan: number, idLinea: number) {
    return this.prisma.lineaAsignatura.findUnique({
      where: {
        idLinea: idLinea,
        Asignatura: {
          some: {
            idPlan: idPlan,
          },
        },
      },
    });
  }
}
