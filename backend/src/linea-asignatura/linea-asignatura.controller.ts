import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LineaAsignaturaService } from './linea-asignatura.service';

@ApiTags('linea-asignatura')
@Controller('linea-asignatura')
export class LineaAsignaturaController {
  constructor(private lineaService: LineaAsignaturaService) {}

  @Get()
  public getAllLineaAsignaturas() {
    return this.lineaService.getAllLineasAsignatura();
  }

  @Get(':idPlan')
  public getAllLineaAsignaturasDePlan(
    @Param('idPlan', ParseIntPipe) idPlan: number,
  ) {
    return this.lineaService.getAllLineasAsignaturasDePlan(idPlan);
  }

  @Get('/asignaturas/:idPlan')
  public getAsignaturasEnLineasDeAsignaturaDePlan(
    @Param('idPlan', ParseIntPipe) idPlan: number,
  ) {
    return this.lineaService.getLineasConAsignaturasDePlan(idPlan);
  }
}
