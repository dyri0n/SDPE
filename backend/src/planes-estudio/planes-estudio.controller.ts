import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PlanesEstudioService } from './planes-estudio.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('plan-de-estudios')
@Controller('planes-de-estudio')
export class PlanesEstudioController {
  constructor(private planesEstudioService: PlanesEstudioService) {}

  // retorna cada código
  // (identificador) de un plan
  // EJ: 2018 (v1)
  @Get()
  getAll() {
    return this.planesEstudioService.findAll();
  }

  @Get(':idPlan')
  getOne(@Param('idPlan', ParseIntPipe) idPlan: number) {
    return this.getOne(idPlan);
  }

  @Post()
  createPlan(@Body() dto: CreatePlanDTO) {
    return this.planesEstudioService.createPlan(dto);
  }

  @Delete(':idPlan')
  deletePlan(@Param('idPlan') idPlan) {
    return this.deletePlan(idPlan);
  }

  @Patch(':idPlan')
  patchPlan(@Param('idPlan') idPlan: number, @Body() dto: ModifyPlanDTO) {
    return this.planesEstudioService.modifyPlan(idPlan, dto);
  }

  // retorna el fluxograma de un plan de estudio
  // lo más probable q llamando al servicio de
  // asignaturas
  @Get(':idPlan/fluxograma')
  getFluxogramaDe(@Param('idPlan', ParseIntPipe) idPlan: number) {
    return this.planesEstudioService.getFluxogram(idPlan);
  }
}
