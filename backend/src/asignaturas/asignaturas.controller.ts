import { Controller, Get } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';

@Controller('asignaturas')
export class AsignaturasController {
  constructor(private readonly asigService: AsignaturasService) {}

  @Get('/asignatura/plan')
  public getAsignaturas(idPlan: number) {
    /*
     * Retorna cada asignatura de
     * un plan de estudios
     * */
    return this.asigService.getAsignaturasDePLan(idPlan);
  }

  @Get(`/asignatura/tributa/id`)
  public getSiguienteDeAsignatura(asignaturaId: number) {
    /*
     * Retorna un arreglo con las asignaturas que abre
     * otra asignatura.
     * O al menos eso se intenta hacer...
     * */
    return this.asigService.getAsignaturasTributadasPor(asignaturaId);
  }
}
