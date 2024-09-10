import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanDTO, ModifyPlanDTO } from './dto';
import { AsignaturasService } from '../asignaturas/asignaturas.service';
import { Plan } from '@prisma/client';

@Injectable()
export class PlanesEstudioService {
  constructor(
    private prisma: PrismaService,
    private readonly asignaturaService: AsignaturasService,
  ) {}

  findAll() {
    throw new Error('Method not implemented.');
  }

  findOne(id: number) {
    throw new Error('Method not implemented.');
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

  async getFluxogram(id: number): Promise<Plan[]> {
    return this.asignaturaService.getAsignaturasDePLan(id);
  }
}
