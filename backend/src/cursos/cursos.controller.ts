import {Controller, Get} from '@nestjs/common';
import {CursosService} from "./cursos.service";

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursoService: CursosService) {
  }
  @Get('/curso/idAsignatura')
  getCursos() {
    //retorna todos los cursos
    //asociados a una asignatura
    return this.cursoService;
  }

  @Get('/curso/idAsignatura/idCurso')
  getInfoCurso(id: number){
    //retorna informacion del curso específico
    return this.cursoService;
  }
}
