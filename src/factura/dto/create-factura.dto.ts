import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateDetalleFacturaDto } from "src/detalle-factura/dto";

export class CreateFacturaDto {

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

    @ApiProperty({type: [CreateDetalleFacturaDto]})
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateDetalleFacturaDto)
    detallesFactura: CreateDetalleFacturaDto[];

}
