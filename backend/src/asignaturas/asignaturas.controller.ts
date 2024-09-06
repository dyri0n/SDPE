import {Controller, Get} from '@nestjs/common';
import { AsignaturasService } from "./asignaturas.service";

@Controller('asignaturas')
export class AsignaturasController {
  constructor(private readonly asigService: AsignaturasService) {}

  @Get('/asignatura/plan')
  getAsignaturas(idPlan: number) {
    /*
    * Retorna cada asignatura de
    * un plan de estudios
    * */
    return this.asigService
  }

  @Get(`/asignatura/tributa/id`)
  getSiguienteDeAsignatura(asignaturaId: number) {
    /*
    * Retorna un arreglo con las asignaturas que abre
    * otra asignatura
    * */
    return this.asigService
  }
}
