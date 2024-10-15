import { Module } from '@nestjs/common';
import { PracticasController } from './practicas.controller';
import { PracticasService } from './practicas.service';
import { EstudiantesService } from '../estudiantes/estudiantes.service';

@Module({
  controllers: [PracticasController],
  providers: [PracticasService, EstudiantesService],
})
export class PracticasModule {}
