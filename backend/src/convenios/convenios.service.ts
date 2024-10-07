import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Convenio } from '@prisma/client';
import { DetalleConvenioDTO } from './dto/detalles.dto';

@Injectable()
export class ConveniosService {
  constructor(private prisma: PrismaService) {}

  async getAllConvenios(): Promise<Convenio[]> {
    return this.prisma.convenio.findMany();
  }

  //BLOQUE detalle de convenio

  private async getConvenioPorId(idConvenio: number): Promise<Convenio> {
    return this.prisma.convenio.findMany({ where: { id: idConvenio } });
  }

  private async getTotalDePracticasEnConvenio(
    idConvenio: number,
  ): Promise<number> {
    return this.prisma.practicaTomada.count({
      where: { idConvenio: idConvenio },
    });
  }
  private async getPromedioDePracticas(idConvenio: number): Promise<number> {
    return this.prisma.$queryRaw`
      SELECT
        AVG(NOTAFINAL)
      FROM CURSACION c JOIN ESTUDIANTE e ON (c.estudianteRut = e.rut)
            JOIN PRACTICATOMADA pt ON (pt.rutEstudiante = e.rut)
            JOIN CONVENIO cn ON (pt.idConvenio = cn.id)
      WHERE cn.id = ${idConvenio}
    `;
  }
  private async getAprobacionDePracticas(idConvenio: number): Promise<number> {
    return this.prisma.$queryRaw`
      WITH notasFinales as (SELECT NOTAFINAL
                            FROM CURSACION c
                                     JOIN ESTUDIANTE e ON (c.estudianteRut = e.rut)
                                     JOIN PRACTICATOMADA pt ON (pt.rutEstudiante = e.rut)
                                     JOIN CONVENIO cn ON (pt.idConvenio = cn.id)
                            WHERE cn.id = ${idConvenio} )
     --PORCENTAJE DE APROBACION 
     SELECT (SUM(CASE WHEN NOTAFINAL > 4.0 THEN 1 END) / COUNT(1)) * 100
     FROM notasFinales
    `;
  }

  async getDetalleConvenioCompleto(
    idConvenio: number,
  ): Promise<DetalleConvenioDTO> {
    /*
    Retorna el detalle completo de un convenio pasándole su idConvenio
    *@return-type DetalleConvenioDTO
    EJ
    {
      convenio: {....},
      nroPracticasRealizadas: 45,
      promedioPracticas: 6.4,
      porcentajeAprobacion: 85,
      porcentajeReprobacion: 15
    }
     */
    const [
      infoConvenio,
      infoPracticasRealizadas,
      infoPromedio,
      infoAprobacion,
    ] = await Promise.all([
      this.getConvenioPorId(idConvenio),
      this.getTotalDePracticasEnConvenio(idConvenio),
      this.getPromedioDePracticas(idConvenio),
      this.getAprobacionDePracticas(idConvenio),
    ]);
    return {
      convenio: infoConvenio,
      nroPracticasRealizadas: infoPracticasRealizadas,
      promedioPracticas: infoPromedio,
      porcentajeAprobacion: infoAprobacion,
      porcentajeReprobacion: 100 - infoAprobacion,
    } as Promise<DetalleConvenioDTO>;
  }
  // FIN bloque detalles de convenio
}
