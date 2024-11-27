import { Asignatura, LineaAsignatura } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';

export class ActualizarDatosLineaDTO {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true, always: true })
  @Type(() => LineasNuevas)
  @ArrayMinSize(1)
  lineasNuevas: LineasNuevas[];
}

class LineasNuevas {
  @IsNotEmpty()
  @IsString()
  @Length(5, 6)
  @Matches(/^[A-Z]{2,3}\d{3}$/, {
    message:
      'El código debe tener de dos a tres letras mayúsculas seguido de tres numeros',
  })
  codigoAsignatura: Asignatura['codigo'];

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  idLineaRelacionada: LineaAsignatura['idLinea'];
}
