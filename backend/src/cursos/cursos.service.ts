import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema/schema';
import { eq } from 'drizzle-orm';
import { curso } from '../drizzle/schema/schema';

@Injectable()
export class CursosService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async getCursosDeAsignatura(idAsignatura: number) {
    return this.db.query.curso.findMany({
      where: eq(curso.idAsignatura, idAsignatura),
    });
  }
}
