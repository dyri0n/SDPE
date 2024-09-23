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
    return this.planesEstudioService.findAll();
  }

  @Get(':idPlan')
  getOne(@Param('idPlan', ParseIntPipe) idPlan: number) {
    return this.planesEstudioService.findOne(idPlan);
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
