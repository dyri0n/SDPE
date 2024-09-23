import { Module } from '@nestjs/common';
import { AsignaturaContempladaController } from './asignatura-contemplada.controller';
import { AsignaturaContempladaService } from './asignatura-contemplada.service';

@Module({
  controllers: [AsignaturaContempladaController],
  providers: [AsignaturaContempladaService],
})
export class AsignaturaContempladaModule {}
