import { Module } from '@nestjs/common';
import { PlanesEstudioController } from './planes-estudio.controller';
import { PlanesEstudioService } from './planes-estudio.service';
import { AsignaturasService } from '../asignaturas/asignaturas.service';

@Module({
  controllers: [PlanesEstudioController],
  providers: [PlanesEstudioService, AsignaturasService],
})
export class PlanesEstudioModule {}
