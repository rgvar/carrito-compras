import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put, UseGuards } from '@nestjs/common';
import { DetalleFacturaService } from './detalle-factura.service';
import { CreateDetalleFacturaDto, DetalleFacturaDto, UpdateDetalleFacturaDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth('jwt-auth')
@Controller('detalle-factura')
export class DetalleFacturaController {
    constructor(private readonly detalleFacturaService: DetalleFacturaService) {}

    @HttpCode(200)
    @Get()
    async getAllDetallesFactura(): Promise<DetalleFacturaDto[]> {
        return await this.detalleFacturaService.getAllDetallesFactura();

    }

    @HttpCode(200)
    @Get(':id')
    async getDetalleFacturaById(@Param('id') id: number): Promise<DetalleFacturaDto> {
        return await this.detalleFacturaService.getDetalleFacturaById(id);

    }

    /*
    @HttpCode(201)
    @Post()
    async createDetalleFactura(@Body() createDetalleFacturaDto: CreateDetalleFacturaDto): Promise<DetalleFacturaDto> {
        return await this.detalleFacturaService.createDetalleFactura(createDetalleFacturaDto);

    }

    @HttpCode(200)
    @Put(':id')
    async updateDetalleFactura(@Param('id') id: number, @Body() updateDetalleFacturaDto: UpdateDetalleFacturaDto): Promise<DetalleFacturaDto> {
        return await this.detalleFacturaService.updateDetalleFactura(id, updateDetalleFacturaDto);

    }

    @HttpCode(204)
    @Delete(':id')
    async removeDetalleFactura(@Param('id') id: number) {
        return await this.detalleFacturaService.removeDetalleFactura(id);

    }

    */
}
