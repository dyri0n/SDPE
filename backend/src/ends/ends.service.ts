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
      where: { idEND: endId },
    });
  }

  async getResultadosEND(endId: number) {
    return this.prisma.resultadoEND.findMany({
      where: { idEND: endId },
    });
  }

  async getResumenPorAlumnoEND(idEND: number, idEstudiante: number) {
    return this.prisma.resultadoEND.findMany({
      where: { idEND: idEND, idEstudiante: idEstudiante },
      include: {
        EstudianteAsociado: true,
        ENDAsociada: true,
      },
    });
  }
}
