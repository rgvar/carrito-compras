import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDetalleFacturaDto, DetalleFacturaDto, UpdateDetalleFacturaDto } from './dto';
import { ProductoService } from 'src/producto/producto.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class DetalleFacturaService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly productoService: ProductoService
    ) {}

    async createManyDetallesFactura(detalles: CreateDetalleFacturaDto[], facturaId: number, tx: Prisma.TransactionClient ): Promise<DetalleFacturaDto[]> {
        // invocado solo desde el método de creación de factura

        const detallesAsync = detalles.map(async (detalle) => {
            
            const producto = await this.productoService.getProductoById(detalle.productoId);

            if (producto.stock < detalle.cantidad) {
                throw new BadRequestException(`Stock insuficiente para producto ID: #${detalle.productoId}. `);
            }
            
            await this.productoService.restarStock(producto.ID, detalle.cantidad, tx);

            const newDetalle = await tx.detalleFactura.create({
                data: {
                    cantidad: detalle.cantidad,
                    subtotal: detalle.cantidad * producto.precioUnitario,
                    productoId: producto.ID,
                    facturaId: facturaId,
                }
            });


            return newDetalle;

        });

        const detallesFactura = await Promise.all(detallesAsync);

        return detallesFactura;
    }

    async getAllDetallesFactura(): Promise<DetalleFacturaDto[]> {

        return await this.prisma.detalleFactura.findMany({
            where: { disponible: true },
            omit: { disponible: true }
        });

    }

    async getDetalleFacturaById(ID: number): Promise<DetalleFacturaDto> {

        const detalleFactura = await this.prisma.detalleFactura.findUnique({
            where: {
                ID,
                disponible: true
            },
            omit: { disponible: true }
        });

        if (!detalleFactura) {
            throw new NotFoundException(`No se encontró Detalle Factura con ID: #${ID}. `);
        }

        return detalleFactura;
    }

    /*
    async createDetalleFactura(createDetalleFacturaDto: CreateDetalleFacturaDto): Promise<DetalleFacturaDto> {

        
        const detalleFactura = await this.prisma.detalleFactura.create({
            data: {
                ...createDetalleFacturaDto
            }
        });

        return detalleFactura;
    }

    async updateDetalleFactura(ID: number, updateDetalleFacturaDto: UpdateDetalleFacturaDto): Promise<DetalleFacturaDto> {

        const detalleFactura = await this.prisma.detalleFactura.findUnique({
            where: {
                ID,
                disponible: true
            }
        });

        if (!detalleFactura) {
            throw new NotFoundException(`No se encontró Detalle Factura con ID: #${ID}. `);
        }

        const updatedDetalleFactura = await this.prisma.detalleFactura.update({
            where: { ID },
            data: {
                ...updateDetalleFacturaDto
            }
        });


        return updatedDetalleFactura;
    }

    async removeDetalleFactura(ID: number) {
        
        const detalleFactura = await this.prisma.detalleFactura.findUnique({
            where: {
                ID,
                disponible: true
            }
        });

        if (!detalleFactura) {
            throw new NotFoundException(`No se encontró Detalle Factura con ID: #${ID}. `);
        }

        await this.prisma.detalleFactura.update({
            where: { ID },
            data: {
                disponible: false
            }
        });

    }
    */

}
