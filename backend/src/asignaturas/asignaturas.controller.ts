import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { ApiTags } from '@nestjs/swagger';
import { CARACTER } from '@prisma/client';

@ApiTags('asignaturas')
@Controller('asignaturas')
export class AsignaturasController {
  constructor(private asigService: AsignaturasService) {}

  /*
   * Retorna cada asignatura registrada
   * */
  @Get(':idPlan')
  public getAsignaturas(@Param('idPlan', ParseIntPipe) idPlan: number) {
    return this.asigService.getAsignaturasDePLan(idPlan);
  }

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
}
