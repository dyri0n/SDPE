import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Convenio, Modalidad } from '@prisma/client';
import { DetalleConvenioDTO } from './dto/detalles.dto';
import {
  conveniosGetAprobacion,
  conveniosGetPromedio,
  conveniosListar,
} from '@prisma/client/sql';
import { ListarConvenioDTO } from '../practicas/dto/listar.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateConvenioDTO, CreateConvenioDTO } from './dto';

@Injectable()
export class ConveniosService {
  constructor(private prisma: PrismaService) {}

  async getAllConvenios(): Promise<Convenio[]> {
    return this.prisma.convenio.findMany();
  }

  //BLOQUE detalle de convenio

  private async getConvenioPorId(idConvenio: number): Promise<Convenio> {
    return await this.prisma.convenio.findUnique({
      where: { idConvenio: idConvenio },
      include: {
        Modalidad: {
          select: { nombreModalidad: true },
        },
      },
    });
  }

  private async getTotalDePracticasEnConvenio(
    idConvenio: number,
  ): Promise<number> {
    return await this.prisma.practicaTomada.count({
      where: {
        PTConvenios: {
          some: {
            idConvenio: idConvenio,
          },
        },
      },
    });
  }

  // TODO: checkear sql modificaciones nuevo modelo
  private async getPromedioDePracticas(idConvenio: number): Promise<number> {
    const response = await this.prisma.$queryRawTyped(
      conveniosGetPromedio(idConvenio),
    );
    if (!response) {
      return 0;
    }
    return response.map((value) => {
      return value.promedioPracticas;
    })[0] as number;
    //por defecto retorna un arreglo de un solo elemento asi que retorna el primer elemento
  }

  private async getAprobacionDePracticas(idConvenio: number): Promise<number> {
    const response = await this.prisma.$queryRawTyped(
      conveniosGetAprobacion(idConvenio),
    );
    if (!response) {
      return 0;
    }
    return response.map((value) => {
      return value.porcentajeaprobacion?.toNumber();
    })[0] as number;
    //por defecto retorna un arreglo de un solo elemento asi que retorna el primer elemento
  }

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
  async getDetalleConvenioCompleto(idConvenio: number) {
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

  // Bloque CRUD de Convenios

  //Usado para "eliminar" un convenio haciendo false su validez
  async invalidarConvenio(idConvenio: number) {
    return await this.prisma.convenio.update({
      where: {
        idConvenio: idConvenio,
      },
      data: {
        validez: false,
      },
    });
  }

  //Usado para actualizar la información de un convenio
  async updateConvenio(idConvenio: number, update: UpdateConvenioDTO) {
    try {
      return await this.prisma.convenio.update({
        where: { idConvenio: idConvenio },
        data: {
          titulo: update.titulo,
          centroPractica: update.centroPractica,
          fechaInicioConvenio: new Date(update.fechaInicioConvenio),
          fechaFinConvenio: new Date(update.fechaFinConvenio),
          documentoConvenio: update.documentoConvenio,
          urlFoto: update.urlFoto,
          Modalidad: {
            connect: {
              idModalidad: update.idModalidad,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error);
        throw new BadRequestException('Error en los datos de la query');
      } else {
        throw error;
      }
    }
  }

  //Usado para crear un nuevo convenio
  async createConvenioConTituloModalidad(create: CreateConvenioDTO) {
    try {
      const nuevoConvenio = await this.prisma.convenio.create({
        data: {
          titulo: create.titulo,
          centroPractica: create.centroPractica,
          fechaInicioConvenio: create.fechaInicioConvenio,
          fechaFinConvenio: create.fechaFinConvenio,
          documentoConvenio: create.documentoConvenio,
          urlFoto: create.urlFoto,
          Modalidad: {
            create: {
              nombreModalidad: create.nombreModalidad,
            },
          },
        },
      });
      return nuevoConvenio;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // unique constraint
        if (error.code === 'P2002') {
          console.error(error);
          throw new ForbiddenException('Información Duplicada');
        }
      } else {
        throw error;
      }
    }
  }

  async createConvenioConRefModalidad(create: CreateConvenioDTO) {
    try {
      const nuevoConvenio = await this.prisma.convenio.create({
        data: {
          titulo: create.titulo,
          centroPractica: create.centroPractica,
          fechaInicioConvenio: create.fechaInicioConvenio,
          fechaFinConvenio: create.fechaFinConvenio,
          documentoConvenio: create.documentoConvenio,
          urlFoto: create.urlFoto,
          Modalidad: {
            connect: {
              id: create.idModalidad,
            },
          },
        },
      });

      return nuevoConvenio;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // unique constraint
        if (error.code === 'P2002') {
          console.error(error);
          throw new ForbiddenException('Información Duplicada');
        }
      } else {
        throw error;
      }
    }
  }

  async createModalidad(create: Modalidad) {
    try {
      const nuevaModalidad = this.prisma.modalidad.create({
        data: create,
      });

      return nuevaModalidad;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.error(error);
          throw new ForbiddenException('Información Duplicada');
        }
      } else {
        throw error;
      }
    }
  }

  // Bloque Listar Convenios
  private async getModalidades(): Promise<
    { idModalidad: number; nombre: string }[]
  > {
    const modalidades = await this.prisma.modalidad.findMany({
      select: { id: true, nombreModalidad: true },
    });
    return modalidades.map((modalidad) => {
      return { idModalidad: modalidad.id, nombre: modalidad.nombreModalidad };
    });
  }
  /**
   * Método principal del BLoque
   * Devuelve un listado de DetalleConvenioDTO[] llamado listadoConvenios
   * acompañado de un arreglo llamado modalidades junto a su id y nombre
   * */
  async listarConvenios() {
    const resultado = await this.prisma.$queryRawTyped(conveniosListar());
    const modalidades = await this.getModalidades();
    const convenios = resultado.map((value) => {
      return {
        idConvenio: value.idConvenio,
        imagen: value.imagen,
        nombreConvenio: value.nombreConvenio,
        centroPractica: value.centroPractica,
        inicio: value.inicio,
        nombreModalidad: value.nombreModalidad,
      };
    }) as ListarConvenioDTO[];
    return {
      listadoConvenios: convenios,
      modalidades: modalidades,
    };
  }

  //Fin Bloque Listar Convenios
}
