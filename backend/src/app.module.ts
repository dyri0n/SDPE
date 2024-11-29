import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsignaturasModule } from './asignaturas/asignaturas.module';
import { CursosModule } from './cursos/cursos.module';
import { PlanesEstudioModule } from './planes-estudio/planes-estudio.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PracticasModule } from './practicas/practicas.module';
import { EndsModule } from './ends/ends.module';
import { ConveniosModule } from './convenios/convenios.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { AuthModule } from './auth/auth.module';
import { LineaAsignaturaModule } from './linea-asignatura/linea-asignatura.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    AsignaturasModule,
    CursosModule,
    PlanesEstudioModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PracticasModule,
    EndsModule,
    ConveniosModule,
    EstudiantesModule,
    AuthModule,
    LineaAsignaturaModule,
    MulterModule.register({ dest: './documents/convenios' }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'documents'),
      serveRoot: '/documents',
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
