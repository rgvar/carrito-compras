import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsPositive } from "class-validator";

export class CreateDetalleFacturaDto {

    @ApiProperty()
    @IsInt()
    @IsPositive()
    cantidad: number;

    @ApiProperty()
    @IsNumber()
    productoId: number;

}
