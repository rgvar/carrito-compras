import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, IsString, MinLength } from "class-validator";


export class RegisterDto {

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
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;



}