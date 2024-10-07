import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PlanesEstudioService } from './planes-estudio.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePlanDTO, ModifyPlanDTO } from './dto';
import { AsignaturasService } from '../asignaturas/asignaturas.service';

@ApiTags('plan-de-estudios')
@Controller('planes-de-estudio')
export class PlanesEstudioController {
  constructor(
    private planesEstudioService: PlanesEstudioService,
    private asignaturasService: AsignaturasService,
  ) {}

  // retorna cada código
  // (identificador) de un plan
  // EJ: 2018 (v1)
  @Get()
  getAll() {
    const result = this.planesEstudioService.findAll();

    if (!result) throw new NotFoundException('No existen planes registrados');

    return result;
  }

  @Get(':idPlan')
  getOne(@Param('idPlan', ParseIntPipe) idPlan: number) {
    const result = this.planesEstudioService.findOne(idPlan);

    if (!result) throw new NotFoundException('No existe el plan especificado');

    return result;
  }

  /*
   * Retorna cada asignatura registrada
   * */
  @Get(':idPlan/asignaturas')
  public getAsignaturas(@Param('idPlan', ParseIntPipe) idPlan: number) {
    const result = this.asignaturasService.getAsignaturasDePlan(idPlan);

    if (!result) throw new NotFoundException('No existe fluxograma asociado');

    return result;
  }

  @Post()
  createPlan(@Body() dto: CreatePlanDTO) {
    return this.planesEstudioService.createPlan(dto);
  }

  @Delete(':idPlan')
  deletePlan(@Param('idPlan', ParseIntPipe) idPlan: number) {
    return this.deletePlan(idPlan);
  }

  @Patch(':idPlan')
  patchPlan(@Param('idPlan') idPlan: number, @Body() dto: ModifyPlanDTO) {
    return this.planesEstudioService.modifyPlan(idPlan, dto);
  }

  // retorna el fluxograma de un plan de estudio
  @Get(':idPlan/fluxograma')
  async getFluxogramaDe(@Param('idPlan', ParseIntPipe) idPlan: number) {
    return this.planesEstudioService.getFluxogram(idPlan);
  }
}