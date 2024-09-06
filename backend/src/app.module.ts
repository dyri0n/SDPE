import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AsignaturasModule } from './asignaturas/asignaturas.module';
import { CursosModule } from './cursos/cursos.module';
import { PlanesEstudioModule } from './planes-estudio/planes-estudio.module';

@Module({
  imports: [DrizzleModule, AsignaturasModule, CursosModule, PlanesEstudioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
