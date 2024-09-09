import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanDTO, ModifyPlanDTO } from './dto';

@Injectable()
export class PlanesEstudioService {
  constructor(private prisma: PrismaService) {}

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

  getFluxogram(id: number) {
    throw new Error('Method not implemented.');
  }
}
