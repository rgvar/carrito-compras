import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FacturaDto, CreateFacturaDto, UpdateFacturaDto } from './dto';
import { Factura } from 'generated/prisma';
import { DetalleFacturaService } from 'src/detalle-factura/detalle-factura.service';
import { DetalleFacturaDto } from 'src/detalle-factura/dto';

@Injectable()
export class FacturaService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly detalleFacturaService: DetalleFacturaService
    ) {}

    async createFactura(createFacturaDto: CreateFacturaDto): Promise<Factura> {
        
        const { detallesFactura, ...facturaData } = createFacturaDto;

        return await this.prisma.$transaction(async (tx) => {
            
            const factura = await tx.factura.create({
                data: {
                    ...facturaData,
                    total: 0,

                }
            });

            const detalles = await this.detalleFacturaService.createManyDetallesFactura(detallesFactura, factura.ID, tx);

            const facturaResponse = await tx.factura.update({
                where: { ID: factura.ID },
                data: {
                    total: this.calculateTotal(detalles)
                },
                include: {
                    detallesFactura: true
                }
            });

            return facturaResponse;

        });

        
    }

    private calculateTotal(detalles: DetalleFacturaDto[]): number {
        
        let total = 0;

        for (const detalle of detalles) {
            total += detalle.subtotal;
        }

        return total;
    }

    async getAllFacturas(): Promise<FacturaDto[]> {

        return await this.prisma.factura.findMany({
            where: {
                disponible: true
            },
            omit: {
                disponible: true
            }
        });

    }

    async getFacturaById(ID: number): Promise<FacturaDto> {
        
        const factura = await this.prisma.factura.findUnique({
            where: {
                ID,
                disponible: true
            },
            include: {
                detallesFactura: true
            },
            omit: {
                disponible: true
            }
        });
        
        if (!factura) {
            throw new NotFoundException(`No se encontró factura con ID: #${ID}. `);
        }

        return factura;

    }

    async updateFactura(ID: number, updateFacturaDto: UpdateFacturaDto): Promise<FacturaDto> {

        const factura = await this.prisma.factura.findUnique({
            where: {
                ID,
                disponible: true
            }
        });
        
        if (!factura) {
            throw new NotFoundException(`No se encontró factura con ID: #${ID}. `);
        }

        const updatedFactura = await this.prisma.factura.update({
            where: { ID },
            data: { ...updateFacturaDto }
        });

        return updatedFactura;

    }

    async removeFactura(ID: number) {

        const factura = await this.prisma.factura.findUnique({
            where: {
                ID,
                disponible: true
            }
        });

        if (!factura) {
            throw new NotFoundException(`No se encontró la factura ID: #${ID}. `);
        }


        await this.prisma.$transaction(async (tx) => {

            await tx.factura.update({
                where: {
                    ID
                },
                data: {
                    disponible: false
                }
            });
    
            await tx.detalleFactura.updateMany({
                where: { 
                    facturaId: ID,
                    disponible: true
                },
                data: {
                    disponible: false
                }
            });
        });
        
    }
}
