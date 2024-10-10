import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  estudiantesGetEstudiante,
  estudiantesGetCursos,
  estudiantesGetPromedioIndividualPorSemestre,
  estudiantesGetPromedioCohortePorSemestre,
} from '@prisma/client/sql';
import {
  AvanceDto,
  CursoEstudianteDTO,
  InfoEstudianteDTO,
  SemestreRealizadoDTO,
} from './dto/avance.dto';
@Injectable()
export class EstudiantesService {
  constructor(private prisma: PrismaService) {}

  // Bloque de Avance de estudiante
  //

  /*
   * Retorna la información de un estudiante utilizando el dto
   * InfoEstudianteDTO
   * EJ
   * {
   *  nombreCompleto: "Nombre Completo",
   *  rut: "21.111.111-1",
   *  agnioIngreso: 2024,
   *  plan: 2020
   * }
   * */
  async getEstudianteById(idEstudiante: number) {
    const infoEstudiante = await this.prisma.$queryRawTyped(
      estudiantesGetEstudiante(idEstudiante),
    );
    return infoEstudiante.map((value) => {
      return {
        nombreCompleto: value.nombreCompleto,
        rut: value.rut,
        agnioIngreso: value.agnioIngreso,
        plan: value.plan,
      };
    })[0] as InfoEstudianteDTO;
    //marca el [0] porque la respuesta de la bd es un arreglo con un sólo elemento
  }

  /*
   * Retorna la información los cursos que ha realizado el estudiante usando
   * CursoEstudianteDTO[]
   * EJ
   * [
   *  {
   *    idAsignatura: 1,
   *    codigo: "FI-2021",
   *    areaFormacion: "FP"
   *    agnioRealizacion: 2024,
   *    semestreRealizacion: 3,
   *    numIntento: 1,
   *    notaFinal: 1
   *  },
   * { ... },
   * { ... }
   * ]
   * */
  async getInfoCursosDeEstudiante(rut: string) {
    const infoCursos = await this.prisma.$queryRawTyped(
      estudiantesGetCursos(rut),
    );
    return infoCursos.map((value) => {
      return {
        idAsignatura: value.id,
        codigo: value.codigo,
        areaFormacion: value.areaFormacion,
        agnioRealizacion: value.agnio,
        semestreRealizacion: value.semestreRelativo,
        notaFinal: value.notaFinal,
      };
    }) as CursoEstudianteDTO[];
  }

  /*
   * Retorna la información del promedio del estudiante a lo largo
   * de los semestres que ha rendido utilizando
   * SemestreRealizadoDTO[]
   * EJ
   * [
   *   {
   *     numSemestre: 1,
   *     promedio: 6.5
   *   },
   *   {
   *     numSemestre: 2,
   *     promedio: 6.4
   *   }
   *   ...
   * ]
   * */
  async getPromedioIndividualPorSemestre(
    rut: string,
  ): Promise<SemestreRealizadoDTO[]> {
    const infoPromedio = await this.prisma.$queryRawTyped(
      estudiantesGetPromedioIndividualPorSemestre(rut),
    );
    return infoPromedio.map((value) => {
      return {
        numSemestre: value.semestreRelativo,
        promedio: value.promedio,
      };
    }) as SemestreRealizadoDTO[];
  }
  /*
   * Retorna la información del promedio de un cohorte o generación a lo largo
   * de los semestres que han rendido utilizando
   * SemestreRealizadoDTO[]
   * EJ
   * [
   *   {
   *     numSemestre: 1,
   *     promedio: 6.5
   *   },
   *   {
   *     numSemestre: 2,
   *     promedio: 6.4
   *   }
   *   ...
   * ]
   * */
  async getPromedioDeCohortePorSemestre(
    agnioCohorte: number,
  ): Promise<SemestreRealizadoDTO[]> {
    const infoPromedio = await this.prisma.$queryRawTyped(
      estudiantesGetPromedioCohortePorSemestre(agnioCohorte),
    );
    return infoPromedio.map((value) => {
      return {
        numSemestre: value.semestreRelativo,
        promedio: value.promedio,
      };
    }) as SemestreRealizadoDTO[];
  }
  async obtAvanceDe(idEstudiante: number) {
    const infoEstudiante = await this.getEstudianteById(idEstudiante);
    if (!infoEstudiante.rut)
      throw new NotFoundException('El estudiante con ese id no existe');

    const rut = infoEstudiante.rut;
    const cohorte = infoEstudiante.agnioIngreso;
    const [cursosRealizados, avanceIndividual, avanceCohorte] =
      await Promise.all([
        this.getInfoCursosDeEstudiante(rut),
        this.getPromedioIndividualPorSemestre(rut),
        this.getPromedioDeCohortePorSemestre(cohorte),
      ]);

    return {
      estudiante: infoEstudiante,
      cursosRealizados: cursosRealizados,
      avanceIndividual: avanceIndividual,
      avanceCohorte: avanceCohorte,
    } as AvanceDto;
  }
}
