import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLineaDTO {
  @IsNotEmpty()
  @IsString()
  tituloLineaNuevo: string;
}

export class CrearLineaDTO {
  @IsNotEmpty()
  @IsString()
  tituloLineaNuevo: string;
}
