import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DetalleFacturaModule } from 'src/detalle-factura/detalle-factura.module';

@Module({
  controllers: [FacturaController],
  providers: [FacturaService],
  imports: [PrismaModule, DetalleFacturaModule]
})
export class FacturaModule {}
