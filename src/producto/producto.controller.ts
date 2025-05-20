import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put, UseGuards } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto, CreateProductoDto, UpdateProductoDto } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth('jwt-auth')
@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}

    @HttpCode(201)
    @Post()
    async createProducto(@Body() createProductoDto: CreateProductoDto): Promise<ProductoDto> {
        return await this.productoService.createProducto(createProductoDto);

    }

    @HttpCode(200)
    @Get()
    async getAllProductos(): Promise<ProductoDto[]> {
        return await this.productoService.getAllProductos();

    }

    @HttpCode(200)
    @Get(':id')
    async getProductById(@Param('id') id: number): Promise <ProductoDto> {
        return await this.productoService.getProductoById(id);

    }

    @HttpCode(200)
    @Put(':id')
    async updateProducto(@Param('id') id: number, @Body() updateProductoDto: UpdateProductoDto): Promise<ProductoDto> {
        return await this.productoService.updateProducto(id, updateProductoDto);

    }

    @HttpCode(204)
    @Delete(':id')
    async remove(@Param('id') id: number) {
        await this.productoService.removeProducto(id);
    }
}
