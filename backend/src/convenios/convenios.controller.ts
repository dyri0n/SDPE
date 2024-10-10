import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConveniosService } from './convenios.service';
@ApiTags('convenios')
@Controller('convenios')
export class ConveniosController {
  constructor(private convenioService: ConveniosService) {}

  @Get(':idConvenio')
  async getByIdConvenio(@Param('idConvenio', ParseIntPipe) idConvenio: number) {
    return this.convenioService.getDetalleConvenioCompleto(idConvenio);
  }
}
