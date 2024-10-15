import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { ApiTags } from '@nestjs/swagger';
import { CARACTER } from '@prisma/client';

@ApiTags('asignaturas')
@Controller('asignaturas')
export class AsignaturasController {
  constructor(private asigService: AsignaturasService) {}

  @Get()
  public async getListaAsignaturas() {
    return await this.asigService.listarAsignaturas();
  }

  @Get('corte-practico')
  public getAsignaturasCortePractico() {
    return this.asigService.getAsignaturasPorCaracter(CARACTER.PRACTICA);
  }

  @Get(':idAsignatura')
  public getAsignatura(
    @Param('idAsignatura', ParseIntPipe) idAsignatura: number,
  ) {
    const result = this.asigService.getAsignatura(idAsignatura);

    if (!result) throw new NotFoundException('La asignatura no existe');

    return result;
  }

  @Get(':idAsignatura/plan/:idPlan')
  public getAsignaturaContemplada(
    @Param('idAsignatura', ParseIntPipe) idAsignatura: number,
    @Param('idPlan', ParseIntPipe) idPlan: number,
  ) {
    const result = this.asigService.getAsignaturaContemplada(
      idPlan,
      idAsignatura,
    );

    if (!result)
      throw new NotFoundException('La asignatura contemplada no existe');

    return result;
  }

  @Get(':idAsignatura/detalle')
  public async getDetalleAsignatura(
    @Param('idAsignatura', ParseIntPipe) idAsignatura: number,
  ) {
    return this.asigService.getDetalleHistoricoAsignatura(idAsignatura);
  }
}
