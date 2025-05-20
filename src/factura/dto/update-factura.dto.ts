import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateFacturaDto  {

    @ApiProperty()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    fecha: Date;

    @ApiProperty()
    @IsString()
    nombreFantasia: string;

    @ApiProperty()
    @IsString()
    fechaFundacion: string;

    @ApiProperty()
    @IsNumber()
    @IsInt()
    usuarioId: number;

}
