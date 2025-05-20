import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, UseGuards } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateFacturaDto, FacturaDto, UpdateFacturaDto } from './dto';

@UseGuards(AuthGuard)
@ApiBearerAuth('jwt-auth')
@Controller('factura')
export class FacturaController {

    constructor(private readonly facturaService: FacturaService) {}

    @HttpCode(201)
    @Post()
    async createFactura(@Body() createFacturaDto: CreateFacturaDto): Promise<any> {
        return await this.facturaService.createFactura(createFacturaDto);

    }

    @HttpCode(200)
    @Get()
    async getAllFacturas(): Promise<FacturaDto[]> {
        return await this.facturaService.getAllFacturas();

    }

    @HttpCode(200)
    @Get(':id')
    async getFactura(@Param('id') id: number): Promise<FacturaDto> {
        return await this.facturaService.getFacturaById(id);

    }

    @HttpCode(200)
    @Put(':id')
    async updateFactura(@Param('id') id: number, @Body() updateFacturaDto: UpdateFacturaDto): Promise<FacturaDto> {
        return await this.facturaService.updateFactura(id, updateFacturaDto);

    }

    @HttpCode(204)
    @Delete(':id')
    async removeFactura(@Param('id') id: number) {
        return await this.facturaService.removeFactura(id);

    }
}
