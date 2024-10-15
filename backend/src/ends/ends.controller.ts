import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EndsService } from './ends.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ENDs')
@Controller('ends')
export class EndsController {
  constructor(private endsService: EndsService) {}

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
}
