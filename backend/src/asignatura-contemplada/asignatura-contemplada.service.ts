import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AsignaturaContempladaService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.planContemplaAsignatura.findMany();
  }

  getByIDs(idPlan: number, idAsig: number) {
    throw new Error('Method not implemented.');
  }

  getAllByAsigId(idAsig: number) {
    throw new Error('Method not implemented.');
  }

  getAllByPlanId(idPlan: number) {
    throw new Error('Method not implemented.');
  }
}
