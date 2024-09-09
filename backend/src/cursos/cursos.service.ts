import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CursosService {
  constructor(private prisma: PrismaService) {}

  async getCursosDeAsignatura(idAsig: number) {
    return this.prisma.curso.findMany({
      where: {
        idAsignatura: idAsig,
      },
    });
  }
}
