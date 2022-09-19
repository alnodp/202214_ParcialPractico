import { IsNotEmpty, IsString, MaxLength, IsDate, IsArray, IsUrl } from "class-validator";

export class ClubDto {

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsDate()
  @IsNotEmpty()
  readonly fechaFundacion: Date;

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
