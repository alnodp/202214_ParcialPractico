import { IsNotEmpty, IsString, MaxLength, IsDateString, IsArray, IsUrl } from "class-validator";

export class ClubDto {

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsDateString()
  @IsNotEmpty()
  readonly fechaFundacion: string;

  @IsUrl()
  @IsNotEmpty()
  readonly imagenUrl: string;

  @MaxLength(100, {
    message: 'Description is too long',
  })
  @IsNotEmpty()
  readonly descripcion: string;

  @IsArray()
  readonly socios: string[];
}
