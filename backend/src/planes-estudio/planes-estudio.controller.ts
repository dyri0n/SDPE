import {Controller, Get} from '@nestjs/common';

@Controller('planes-estudio')
export class PlanesEstudioController {
  constructor(private readonly planesEstudioService) {}

  @Get('/plan-estudio/')
  getCodigoPlanes() {
    //retorna cada código
    // (identificador) de un plan
    // EJ: 2018 (v1)
    return this.planesEstudioService;
  }

  @Get('/plan-estudio/fluxograma/id')
  getFluxogramaDe(id: number) {
    // retorna el fluxograma de un plan de estudio
    // lo más probable q llamando al controlador de
    // asignaturas
    return this.planesEstudioService;
  }
}
