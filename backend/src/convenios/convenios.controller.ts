import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConveniosService } from './convenios.service';
import { PracticasService } from '../practicas/practicas.service';
import { Convenio } from '@prisma/client';

@ApiTags('convenios')
@Controller('convenios')
export class ConveniosController {
  constructor(
    private convenioService: ConveniosService,
    private practicaService: PracticasService,
  ) {}

  @Get('detalle/:idConvenio')
  getByIdConvenio(@Param(':idConvenio', ParseIntPipe) idConvenio: number) {
    const convenio: Promise<Convenio> =
      this.convenioService.getConvenioPorId(idConvenio);
    const totalPracticas: Promise<number> =
      this.convenioService.getTotalDePracticasEnConvenio(idConvenio);
    const promedioPracticasConvenio: Promise<number> =
      this.convenioService.getPromedioDePracticas(idConvenio);
    const aprobacionPracticas: Promise<number> =
      this.convenioService.getAprobacionDePracticas(idConvenio);
    const reprobacionPracticas: Promise<number> = aprobacionPracticas.then(
      (value) => {
        return 100 - value;
      },
    );

    return {
      infoConvenio: convenio,
      infoTotalPracticas: totalPracticas,
      infoPromedio: promedioPracticasConvenio,
      infoAprobacion: aprobacionPracticas,
      infoReprobacion: reprobacionPracticas,
    };
  }
}
