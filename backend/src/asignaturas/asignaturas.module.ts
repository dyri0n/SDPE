import { Module } from '@nestjs/common';
import { AsignaturaController } from './asignatura.controller';
import { AsignaturasController } from './asignaturas.controller';
import { AsignaturasService } from './asignaturas.service';

@Module({
  controllers: [AsignaturaController, AsignaturasController],
  providers: [AsignaturasService]
})
export class AsignaturasModule {}
