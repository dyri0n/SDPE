import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConveniosService } from './convenios.service';
import { CreateConvenioDTO, UpdateConvenioDTO } from './dto/crud.dto';
@ApiTags('convenios')
@Controller('convenios')
export class ConveniosController {
  constructor(private convenioService: ConveniosService) {}

  @Get(':idConvenio')
  async getByIdConvenio(@Param('idConvenio', ParseIntPipe) idConvenio: number) {
    return this.convenioService.getDetalleConvenioCompleto(idConvenio);
  }

  @Patch(':idConvenio')
  async update(
    @Param('idConvenio', ParseIntPipe) idConvenio: number,
    @Body() updateDTO: UpdateConvenioDTO,
  ) {
    return this.convenioService.updateConvenio(idConvenio, updateDTO);
  }

  @Delete(':idConvenio')
  async delete(@Param('idConvenio', ParseIntPipe) idConvenio: number) {
    return this.convenioService.invalidarConvenio(idConvenio);
  }

  @Post()
  async create(@Body() createDTO: CreateConvenioDTO) {
    return this.convenioService.createConvenio(createDTO);
  }
}
