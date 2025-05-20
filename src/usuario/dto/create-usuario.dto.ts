import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString } from "class-validator";

export class CreateUsuarioDto {

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    fechaNacimiento: Date;

    @ApiProperty()
    @IsString()
    dni: string;

    @ApiProperty()
    @IsString()
    nombreCompleto: string;

    @ApiProperty()
    @IsString()
    sexo: string;

    @ApiProperty()
    @IsString()
    estadoCivil: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

}
