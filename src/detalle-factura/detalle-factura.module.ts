import { Module } from '@nestjs/common';
import { DetalleFacturaService } from './detalle-factura.service';
import { DetalleFacturaController } from './detalle-factura.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductoModule } from 'src/producto/producto.module';

@Module({
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService],
  exports: [DetalleFacturaService],
  imports: [PrismaModule, ProductoModule]
})
export class DetalleFacturaModule {}
