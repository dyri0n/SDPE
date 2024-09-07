import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AsignaturaContempladaService } from './asignatura-contemplada.service';

@ApiTags('asignatura', 'plan-de-estudios')
@Controller('asignaturas-contempladas')
export class AsignaturaContempladaController {
  constructor(private ACService: AsignaturaContempladaService) {}

  @Get('/planes/:idPlan')
  getAllByPlanId(@Param('idPlan') idPlan: number) {
    return this.ACService.getAllByPlanId(idPlan);
  }

  @Get('/asignaturas/:idAsignatura')
  getAllByAsigId(@Param('idAsignatura') idAsig: number) {
    return this.ACService.getAllByAsigId(idAsig);
  }

  @Get('/planes/:idPlan/asignaturas/:idAsignatura')
  getByIDs(
    @Param('idPlan') idPlan: number,
    @Param('idAsignatura') idAsig: number,
  ) {
    return this.ACService.getByIDs(idPlan, idAsig);
  }
}
