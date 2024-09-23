import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AREA, CARACTER, Practica, PracticaTomada } from '@prisma/client';

@Injectable()
export class PracticasService {
  constructor(private prisma: PrismaService) {}

  async getAllInfoPracticas(): Promise<Practica[]> {
    return this.prisma.practica.findMany();
  }

  async getAllPracticasCursadasPorIdPractica(
    idPractica: number,
  ): Promise<PracticaTomada[]> {
    return this.prisma.practicaTomada.findMany({
      where: { idPractica: idPractica },
    });
  }

  async getAllPracticasCursadasPorEstudiante(
    rutEstudiante: string,
  ): Promise<PracticaTomada[]> {
    return this.prisma.practicaTomada.findMany({
      where: { rutEstudiante: rutEstudiante },
    });
  }

  //devuelve las asignaturas tomadas por estudiantes segun el
  //area de formacion de sus prerrequisitos
  //TODO REVISAR SI FUNCIONA
  async getAllPracticasCursadasPorAreaFormacion(
    areaFormacion: AREA,
  ): Promise<PracticaTomada[]> {
    return this.prisma.$queryRaw`
    SELECT pt.* FROM 
        PRACTICATOMADA pt 
                JOIN PRACTICA p ON (pt.idPractica = p.id)
                JOIN PLANCONTEMPLAASIGNATURA pc ON (pc.idPlan = p.idPlan) 
                JOIN TRIBUTACION ON (idAsignaturaTributada = pc.idAsignatura)
    WHERE pc.areaFormacion = ${areaFormacion}
    `;
  }
}
