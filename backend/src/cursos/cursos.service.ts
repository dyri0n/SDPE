import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { curso } from '../drizzle/schema/schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';

@Injectable()
export class CursosService {
  constructor(
    @Inject(DRIZZLE)
    private db: DrizzleDB,
  ) {}

  async getCursosDeAsignatura(idAsignatura: number) {
    return this.db.query.curso.findMany({
      where: eq(curso.idAsignatura, idAsignatura),
    });
  }
}
