import { IsNotEmpty, IsString, IsEmail, IsDate, IsArray } from "class-validator";

export class SocioDto {

  @IsString()
  @IsNotEmpty()
  readonly usuario: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsDate()
  @IsNotEmpty()
  readonly fechaNacimiento: Date;

  @IsArray()
  readonly clubes: string[];
}
