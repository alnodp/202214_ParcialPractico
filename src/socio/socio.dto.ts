import { IsNotEmpty, IsString, IsEmail, IsDateString, IsArray } from "class-validator";

export class SocioDto {

  @IsString()
  @IsNotEmpty()
  readonly usuario: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsDateString()
  @IsNotEmpty()
  readonly fechaNacimiento: string;

  @IsArray()
  readonly clubes: string[];
}
