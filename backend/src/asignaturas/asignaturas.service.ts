import { Inject, Injectable } from '@nestjs/common';
import { planContemplaAsignatura } from '../drizzle/schema/schema';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';

@Injectable()
export class AsignaturasService {
  constructor(
    @Inject(DRIZZLE)
    private db: DrizzleDB,
  ) {}

  async getAsignaturasDePLan(planId: number) {
    return this.db.query.planContemplaAsignatura.findMany({
      where: eq(planContemplaAsignatura.idPlan, planId),
    });
  }
}
