import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsignaturasModule } from './asignaturas/asignaturas.module';
import { CursosModule } from './cursos/cursos.module';
import { PlanesEstudioModule } from './planes-estudio/planes-estudio.module';
import { AsignaturaContempladaModule } from './asignatura-contemplada/asignatura-contemplada.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PracticasModule } from './practicas/practicas.module';

@Module({
  imports: [
    AsignaturasModule,
    CursosModule,
    PlanesEstudioModule,
    AsignaturaContempladaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PracticasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
