import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";


export class LoginDto {

    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @MinLength(6)
    @IsString()
    password: string;

}