import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EndsService {
  constructor(private prisma: PrismaService) {}

  async getResultadosEND(idEnd: number) {
    return this.prisma.resultadoEND.findMany({
      where: { datosENDId: idEnd },
    });
  }

  async getDatosEND(idEnd: number) {
    return this.prisma.datosEND.findMany({
      where: { id: idEnd },
    });
  }

  async getResumenPorAlumnoEND(rutEstudiante: string) {
    return this.prisma.resultadoEND.findMany({
      where: { rutEstudiante: rutEstudiante },
      include: {
        end: true,
      },
    });
  }
}
