import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto, UpdateProductoDto, ProductoDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ProductoService {

    constructor(private readonly prisma: PrismaService) {}


    async createProducto(createProductoDto: CreateProductoDto): Promise<ProductoDto> {
        const producto = await this.prisma.producto.create({
            data: {
                ...createProductoDto
            }
        });

        return producto;
    }

    async getAllProductos(): Promise<ProductoDto[]> {
        return await this.prisma.producto.findMany({
            where: { disponible: true },
            omit: { disponible: true }
        });

    }

    async getProductoById(ID: number): Promise<ProductoDto> {
        const producto = await this.prisma.producto.findUnique({
            where: {
                ID,
                disponible: true
            },
            omit: { disponible: true }
        });
        if (!producto) {
            throw new NotFoundException(`No se encontró el producto ID: #${ID}. `);
        }

        return producto;

    }

    async updateProducto(ID: number, updateProductoDto: UpdateProductoDto): Promise<ProductoDto> {
        const producto = await this.prisma.producto.findUnique({
            where: {
                ID,
                disponible: true
            }
        });
        if (!producto) {
            throw new NotFoundException(`No se encontró el producto ID: #${ID}. `);
        }

        const updatedProducto = await this.prisma.producto.update({
            where: {ID},
            data: {...updateProductoDto},
            omit: { disponible: true }
        });

        return updatedProducto;

    }

    async removeProducto(ID: number)  {
        const producto = await this.prisma.producto.findUnique({
            where: {
                ID,
                disponible: true
            }
        });

        if (!producto) {
            throw new NotFoundException(`No se encontró el producto ID: #${ID}. `);
        }

        await this.prisma.producto.update({
            where: {ID},
            data: {
                disponible: false
            }
        });

    }

    
    async restarStock(ID: number, cantidadARestar: number, tx: Prisma.TransactionClient ) {
        await tx.producto.update({
            where: { ID },
            data: {
                stock: { decrement: cantidadARestar }
            }
        });
    }
    
}
