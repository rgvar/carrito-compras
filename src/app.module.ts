import { Module } from '@nestjs/common';
import { FacturaModule } from './factura/factura.module';
import { DetalleFacturaModule } from './detalle-factura/detalle-factura.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProductoModule } from './producto/producto.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [FacturaModule, DetalleFacturaModule, UsuarioModule, ProductoModule, PrismaModule, AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        })
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
