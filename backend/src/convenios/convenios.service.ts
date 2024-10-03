import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Convenio } from '@prisma/client';

@Injectable()
export class ConveniosService {
  constructor(private prisma: PrismaService) {}

  async getAllConvenios(): Promise<Convenio[]> {
    return this.prisma.convenio.findMany();
  }

  async getConvenioPorId(idConvenio: number): Promise<Convenio> {
    return this.prisma.convenio.findMany({ where: { id: idConvenio } });
  }

  async getTotalDePracticasEnConvenio(idConvenio: number): Promise<number> {
    return this.prisma.practicaTomada.count({
      where: { idConvenio: idConvenio },
    });
  }
  async getPromedioDePracticas(idConvenio: number): Promise<number> {
    return this.prisma.$queryRaw`
      SELECT
        AVG(NOTAFINAL)
      FROM CURSACION c JOIN ESTUDIANTE e ON (c.estudianteRut = e.rut)
            JOIN PRACTICATOMADA pt ON (pt.rutEstudiante = e.rut)
            JOIN CONVENIO cn ON (pt.idConvenio = cn.id)
      WHERE cn.id = ${idConvenio}
    `;
  }

  //TODO: NO SÉ COMO TESTEAR ESTO
  async getAprobacionDePracticas(idConvenio: number): Promise<number> {
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
}
