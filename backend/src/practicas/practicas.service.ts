import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Practica, PracticaTomada } from '@prisma/client';
import { DetallePracticasDTO, InfoPracticaDTO } from './dto/detalles.dto';
import { practicasGetDetallePorEstudiante } from '@prisma/client/sql';
import { EstudiantesService } from '../estudiantes/estudiantes.service';
import { InfoEstudianteDTO } from '../estudiantes/dto/avance.dto';

@Injectable()
export class PracticasService {
  constructor(
    private prisma: PrismaService,
    private estudianteService: EstudiantesService,
  ) {}

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
    idEstudiante: number,
  ): Promise<PracticaTomada[]> {
    return this.prisma.practicaTomada.findMany({
      where: { EstudianteAsociado: { id: idEstudiante } },
    });
  }

  /*
  //devuelve las asignaturas tomadas por estudiantes segun el
  //area de formacion de sus prerrequisitos
  //DESATAR CUANDO SEA NECESARIO
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
  */

  // Bloque Detalle de Practica por Estudiante
  /*
   * Retorna la información de prácticas realizadas por un solo estudiante
   * en el InfoPracticaDTO
   *
   * InfoPracticaDTO =
   *   { titulo, centroPractica, nombreModalidad, notaFinal, intento ... }
   *
   * Más info del dto en ./dto/detalles.dto.ts
   *
   * Es posible agregar más atributos modificando la consulta sql y el dto
   * de InfoPracticaDTO
   *
   * */
  private async getInfoPracticasDeEstudiante(
    idEstudiante: number,
  ): Promise<InfoPracticaDTO[]> {
    const resultado = await this.prisma.$queryRawTyped(
      practicasGetDetallePorEstudiante(idEstudiante),
    );
    return resultado.map((value) => {
      return {
        titulo: value.titulo,
        centroPractica: value.centroPractica,
        nombreModalidad: value.nombreModalidad,
        notaFinal: value.notaFinal,
        numIntento: value.numIntento,
        tipoPractica: value.nombrePractica,
        posicionRelativa: value.numeroPractica,
      };
    }) as InfoPracticaDTO[];
  }

  // Método principal
  /*
   *  EJ:
   * {
   *   estudiante : InfoEstudianteDTO,
   *   practicas: InfoPracitcaDTO[]
   * }
   * */
  async getDetallePracticasDeEstudiante(idEstudiante: number) {
    const estudiante: InfoEstudianteDTO =
      await this.estudianteService.getEstudianteById(idEstudiante);
    if (!estudiante) throw NotFoundException;

    const infoPracticas: InfoPracticaDTO[] =
      await this.getInfoPracticasDeEstudiante(idEstudiante);

    return {
      estudiante: estudiante,
      practicas: infoPracticas,
    } as DetallePracticasDTO;
  }

  // FIN bloque detalle de practica por estudiante
}
