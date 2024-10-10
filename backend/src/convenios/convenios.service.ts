import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Convenio } from '@prisma/client';
import { DetalleConvenioDTO } from './dto/detalles.dto';
import {
  conveniosGetAprobacion,
  conveniosGetPromedio,
} from '@prisma/client/sql';

@Injectable()
export class ConveniosService {
  constructor(private prisma: PrismaService) {}

  async getAllConvenios(): Promise<Convenio[]> {
    return this.prisma.convenio.findMany();
  }

  //BLOQUE detalle de convenio

  private async getConvenioPorId(idConvenio: number): Promise<Convenio> {
    return this.prisma.convenio.findUnique({ where: { id: idConvenio } });
  }

  private async getTotalDePracticasEnConvenio(
    idConvenio: number,
  ): Promise<number> {
    return this.prisma.practicaTomada.count({
      where: { idConvenio: idConvenio },
    });
  }
  private async getPromedioDePracticas(idConvenio: number): Promise<number> {
    const response = await this.prisma.$queryRawTyped(
      conveniosGetPromedio(idConvenio),
    );
    return response.at(0).promedioPracticas;
  }
  private async getAprobacionDePracticas(idConvenio: number): Promise<number> {
    const response = await this.prisma.$queryRawTyped(
      conveniosGetAprobacion(idConvenio),
    );
    return response.at(0).porcentajeaprobacion.toNumber();
  }

  async getDetalleConvenioCompleto(idConvenio: number) {
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
      promedioPracticas: infoPromedio || 0,
      porcentajeAprobacion: infoAprobacion || 0,
      porcentajeReprobacion: 100 - (infoAprobacion || 0),
    } as DetalleConvenioDTO;
  }
  // FIN bloque detalles de convenio
}
