import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserRegisterDTO {
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  username: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsString()
  nombreCompleto: string;
}
