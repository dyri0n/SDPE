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

  @Get('corte-practico')
  public getAsignaturasCortePractico() {
    return this.asigService.getAsignaturasPorCaracter(CARACTER.PRACTICA);
  }

  @Get('rendimiento-general/:idPlan/:idAsignatura')
  public getResumenResultado(
    @Param('idPlan', ParseIntPipe) idPlan: number,
    @Param('idAsignatura', ParseIntPipe) idAsignatura: number,
  ) {
    // DE MOMENTO SOLO MUESTRA EL PROMEDIO DE LA ASIGNATURA, EN TEORIA
    // DEBE MOSTRAR MÁS COSAS
    return {
      promedio: this.asigService.getPromedioDeAsignatura(idPlan, idAsignatura),
      resultadosIndividuales:
        this.asigService.getResultadosDeAsignaturaPractica(
          idPlan,
          idAsignatura,
        ),
    };
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

  @Get('listar')
  public async getListaAsignaturas() {
    return await this.asigService.listarAsignaturas();
  }

  @Get(':idAsignatura/detalle')
  public async getDetalleAsignatura(
    @Param('idAsignatura', ParseIntPipe) idAsignatura: number,
  ) {
    return await this.asigService.getDetalleHistoricoAsignatura(idAsignatura);
  }
}
