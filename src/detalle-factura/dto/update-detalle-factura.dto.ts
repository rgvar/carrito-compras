import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateDetalleFacturaDto {

    @ApiProperty()
    @IsNumber()
    subtotal: number;

    @ApiProperty()
    @IsNumber()
    cantidad: number;

    @ApiProperty()
    @IsNumber()
    facturaId: number;

    @ApiProperty()
    @IsNumber()
    productoId: number;

}
