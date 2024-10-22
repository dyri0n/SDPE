import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanDTO, ModifyPlanDTO } from './dto';
import { PlanContemplaAsignatura } from '@prisma/client';

@Injectable()
export class PlanesEstudioService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.plan.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.plan.findUnique({ where: { id: id } });
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
        asignatura: true,
        esRequeridaEn: {
          select: {
            idAsignaturaTributada: true,
          },
        },
        esTributadaEn: {
          select: {
            idAsignaturaRequerida: true,
          },
        },
      },
    });
  }

  async getLineasDeAsignaturas(id: number) {
    return this.prisma.lineaAsignatura.findMany({
      where: {
        idPlan: id,
      },
      select: {
        id: true,
        titulo: true,
        LineaContemplaAsignatura: {
          select: {
            posicion: true,
            AsignaturaContempladaReferenciada: true,
          },
        },
      },
    });
  }

  async findOneLineaAsignatura(idPlan: number, idLinea: number) {
    return this.prisma.lineaAsignatura.findUnique({
      where: {
        id_idPlan: {
          id: idLinea,
          idPlan: idPlan,
        },
      },
      select: {
        id: true,
        titulo: true,
        LineaContemplaAsignatura: {
          select: {
            posicion: true,
            AsignaturaContempladaReferenciada: true,
          },
        },
      },
    });
  }
}
