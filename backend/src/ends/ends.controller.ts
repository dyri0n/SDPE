import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EndsService } from './ends.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PatchResultadoENDDTO, PostResultadoENDDTO } from './dto/documento.dto';

@ApiTags('ENDs')
@Controller('ends')
export class EndsController {
  constructor(private endsService: EndsService) {}
  /*
  @Get()
  getAllENDs() {
    const result = this.endsService.getAll();
    if (!result) throw new NotFoundException('No se han encontrado ENDs');
    return result;
  }

  @Get(':endId')
  getOneEND(@Param('endId', ParseIntPipe) endId: number) {
    const result = this.endsService.getOneEnd(endId);
    if (!result)
      throw new NotFoundException(
        `No existe la end con la id (${endId}) proporcionada`,
      );
    return result;
  }

  @Get(':endId/resultados')
  getResultsFromEND(@Param('endId', ParseIntPipe) endId: number) {
    const result = this.endsService.getResultadosEND(endId);
    if (!result)
      throw new NotFoundException(
        'No se han registrado resultados para la END especificada',
      );
    return result;
  }

  @Get(':endId/resultados/estudiantes/:estudianteId')
  getResultsFromStudent(
    @Param('endId', ParseIntPipe) endId: number,
    @Param('estudianteId', ParseIntPipe) estudianteId: number,
  ) {
    const result = this.endsService.getResumenPorAlumnoEND(endId, estudianteId);
    if (!result)
      throw new NotFoundException(
        'No se han encontrado resultados de la END especificada para el estudiante especificado',
      );
    return result;
  }
  */
  //BLOQUE Documentos de END

  @Get('documentos/')
  async getDatosResultadoEND() {
    return this.endsService.getDocumentosEND();
  }

  @Get('documentos/:idDato')
  async getDatoENDPorId(@Param('idDato', ParseIntPipe) idDato: number) {
    const documentoEND = await this.endsService.getDocumentoById(idDato);
    if (!documentoEND)
      throw new NotFoundException(
        'No existe ningún documento asociado a esa ID',
      );
    return documentoEND;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './dist/documents/end',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          callback(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  )
  async postDocumentoEND(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDTO: PostResultadoENDDTO,
  ) {
    const extensionArchivo = file.originalname.split('.').pop();
    if (extensionArchivo != 'pdf') {
      throw new BadRequestException('Debe enviar un documento pdf');
    }
    const pathDocumento = file.path;
    return this.endsService.registrarNuevoResultadoEND(
      createDTO,
      pathDocumento,
    );
  }

  @Patch()
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './dist/documents/end',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          callback(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  )
  async updateInfoResultados(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateDto: PatchResultadoENDDTO,
  ) {
    const extensionArchivo = file.originalname.split('.').pop();
    if (extensionArchivo != 'pdf') {
      throw new BadRequestException('Debe enviar un documento pdf');
    }
    const pathDocumento = file.path;

    return this.endsService.actualizarDocumentoEND(updateDto, pathDocumento);
  }

  //FIN BLOQUE Documentos END
}
