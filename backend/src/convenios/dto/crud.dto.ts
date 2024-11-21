import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateConvenioDTO {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  centroPractica?: string;

  @IsOptional()
  @IsDate()
  fechaInicioConvenio?: Date;

  @IsOptional()
  @IsDate()
  fechaFinConvenio?: Date;

  @IsOptional()
  @IsString()
  documentoConvenio?: string;

  @IsOptional()
  @IsString()
  urlFoto?: string;

  @IsOptional()
  @IsNumber()
  idModalidad?: number;
}

export class CreateConvenioDTO {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  centroPractica: string;

  @IsNotEmpty()
  @IsDate()
  fechaInicioConvenio: Date;

  @IsOptional()
  @IsDate()
  fechaFinConvenio?: Date;

  @IsOptional()
  @IsString()
  documentoConvenio?: string;

  @IsOptional()
  @IsString()
  urlFoto?: string;

  @IsNotEmpty()
  @IsNumber()
  idModalidad: number;
}
