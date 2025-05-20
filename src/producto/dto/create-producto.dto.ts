import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class CreateProductoDto {

    @ApiProperty()
    @IsString()
    nombre: string;

    @ApiProperty()
    @IsNumber()
    precioUnitario: number;

    @ApiProperty()
    @IsString()
    descripcion: string;

    @ApiProperty()
    @IsNumber()
    stock: number;

}
