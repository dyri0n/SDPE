import { Controller, Get } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('asignaturas')
@Controller('asignaturas')
export class AsignaturasController {
  constructor(private asigService: AsignaturasService) {}

  /*
   * Retorna cada asignatura registrada
   * */
  @Get()
  public getAsignaturas(idPlan: number) {
    return this.asigService.getAsignaturasDePLan(idPlan);
  }
}
