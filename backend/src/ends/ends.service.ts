import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EndsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.eND.findMany();
  }

  async getOneEnd(endId: number) {
    return this.prisma.eND.findMany({
      where: { id: endId },
    });
  }

  async getResultadosEND(endId: number) {
    return this.prisma.resultadoEND.findMany({
      where: { endId: endId },
    });
  }

  async getResumenPorAlumnoEND(endId: number, estudianteId: number) {
    return this.prisma.resultadoEND.findMany({
      where: { endId: endId, estudianteId: estudianteId },
      include: {
        EstudianteAsociado: true,
        ENDAsociada: true,
      },
    });
  }
}
