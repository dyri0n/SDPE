import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';

@Injectable()
export class PlanesEstudioService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  findAll() {}
  findOne(id: number) {}

  createPlan(data: CreatePlanDTO) {}

  deletePlan(id: number) {}

  modifyPlan(id: number, data: ModifyPlanDTO) {}

  getFluxogram(id: number) {}
}
