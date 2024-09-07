import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AsignaturasModule } from './asignaturas/asignaturas.module';
import { CursosModule } from './cursos/cursos.module';
import { PlanesEstudioModule } from './planes-estudio/planes-estudio.module';
import { AsignaturaContempladaModule } from './asignatura-contemplada/asignatura-contemplada.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DrizzleModule,
    AsignaturasModule,
    CursosModule,
    PlanesEstudioModule,
    AsignaturaContempladaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
