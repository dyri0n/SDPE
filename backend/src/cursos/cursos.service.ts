import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cursacion } from '@prisma/client';

@Injectable()
export class CursosService {
  constructor(private prisma: PrismaService) {}

  //proximamente desaparecerá...
  async getCursosDeAsignatura(idAsig: number) {
    return this.prisma.cursacion.findMany({
      where: {
        idAsignatura: idAsig,
      },
    });
  }

  async getCursacionesDeAsignatura(
    idAsignatura: number,
    idPlan,
  ): Promise<Cursacion[]> {
    return this.prisma.cursacion.findMany({
      where: { idPlan: idPlan, idAsignatura: idAsignatura },
    });
  }
}
