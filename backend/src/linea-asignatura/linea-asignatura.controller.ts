import {
  Body,
  Controller,
  Get,
  ImATeapotException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LineaAsignaturaService } from './linea-asignatura.service';
import { ActualizarDatosLineaDTO } from './dto';

@ApiTags('linea-asignatura')
@Controller('linea-asignatura')
export class LineaAsignaturaController {
  constructor(private lineaService: LineaAsignaturaService) {}

  @Get()
  public getAllLineaAsignaturas() {
    return this.lineaService.getAllLineasAsignatura();
  }

  //OBTIENE LAS LINEAS Y SUS ASIGNATURAS
  @Get('/asignaturas/:idPlan')
  public getAsignaturasEnLineasDeAsignaturaDePlan(
    @Param('idPlan', ParseIntPipe) idPlan: number,
  ) {
    return this.lineaService.getLineasConAsignaturasDePlan(idPlan);
  }

  //OBTIENE SOLO LOS TITULOS DE LAS LINEAS
  @Get(':idPlan')
  public getAllLineaAsignaturasDePlan(
    @Param('idPlan', ParseIntPipe) idPlan: number,
  ) {
    return this.lineaService.getAllLineasAsignaturasDePlan(idPlan);
  }

  @Post('/asignaturas/:idPlan')
  public actualizarDatosPorPlan(
    @Param('idPlan') idPlan: number,
    @Body() dto: ActualizarDatosLineaDTO,
  ) {
    const result = this.lineaService.updateDatosLineaPorPlan(idPlan, dto);

    if (!result) throw new ImATeapotException('qe');

    return result;
  }
}
