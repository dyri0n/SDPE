import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema/schema';
import {
  asignaturaTributa,
  planContemplaAsignatura,
} from '../drizzle/schema/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AsignaturasService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}
  async getAsignaturasDePLan(planId: number) {
    return this.db.query.planContemplaAsignatura.findMany({
      where: eq(planContemplaAsignatura.idPlan, planId),
    });
  }
  async getAsignaturasTributadasPor(asignaturaId: number) {
    return this.db.query.asignaturaTributa.findMany({
      columns: { idAsignaturaTributada: true, idAsignaturaPrevia: true },
      where: eq(asignaturaTributa.idAsignaturaPrevia, asignaturaId),
    });
  }
}
