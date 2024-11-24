import {
  BadRequestException,
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
import { CreateConvenioDTO, UpdateConvenioDTO } from './dto';
@ApiTags('convenios')
@Controller('convenios')
export class ConveniosController {
  constructor(private convenioService: ConveniosService) {}

  @Get(':idConvenio')
  async getByIdConvenio(@Param('idConvenio', ParseIntPipe) idConvenio: number) {
    return this.convenioService.getDetalleConvenioCompleto(idConvenio);
  }

  @Get()
  async getAll() {
    return this.convenioService.listarConvenios();
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
  async create(
    @Body()
    createDTO: CreateConvenioDTO,
  ) {
    if (createDTO.idModalidad) {
      return this.convenioService.createConvenioConRefModalidad(createDTO);
    } else if (createDTO.nombreModalidad) {
      return this.convenioService.createConvenioConTituloModalidad(createDTO);
    } else {
      throw new BadRequestException('Los datos no sirven arreglalos');
    }
  }
}
