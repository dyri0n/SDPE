import {
  Controller,
  Get,
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

  @Get('estudiante/:rutEstudiante')
  getByEstudiante(@Param(':rutEstudiante') rutEstudiante: string) {
    return this.practicaService.getAllPracticasCursadasPorEstudiante(
      rutEstudiante,
    );
  }

  @Get('areaFormacion/:areaFormacion')
  getByAreaFormacion(
    @Param('areaFormacion', new ParseEnumPipe(AREA)) areaFormacion: AREA,
  ) {
    return this.practicaService.getAllPracticasCursadasPorAreaFormacion(
      areaFormacion,
    );
  }
}
