import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { PracticasService } from './practicas.service';
import { ApiTags } from '@nestjs/swagger';
import { AREA } from '@prisma/client';

@ApiTags('practicas')
@Controller('practicas')
export class PracticasController {
  constructor(private practicaService: PracticasService) {}

  @Get(':idPractica')
  getOne(@Param('idPractica', ParseIntPipe) idPractica: number) {
    return this.practicaService.getAllPracticasCursadasPorIdPractica(
      idPractica,
    );
  }

  @Get('estudiante/:idEstudiante')
  getByEstudiante(@Param('idEstudiante', ParseIntPipe) idEstudiante: number) {
    return this.practicaService.getDetallePracticasDeEstudiante(idEstudiante);
  }

  @Get('areaFormacion/:areaFormacion')
  getByAreaFormacion(
    @Param('areaFormacion', new ParseEnumPipe(AREA)) areaFormacion: AREA,
  ) {
    //return this.practicaService.getAllPracticasCursadasPorAreaFormacion(
    //  areaFormacion,
    //);
  }

  @Get('modalidades')
  getAllModalidades() {
    const result = this.practicaService.getAllModalidades();

    if (!result)
      throw new NotFoundException('No existen modalidades registradas');

    return result;
  }

  @Get('modalidades/:idModalidad')
  getOneModalidad(@Param('idModalidad') idModalidad: number) {
    const result = this.practicaService.getOneModalidad(idModalidad);

    if (!result)
      throw new NotFoundException('No existe la modalidad especificada');

    return result;
  }
}
