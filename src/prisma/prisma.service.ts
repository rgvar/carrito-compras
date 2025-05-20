import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    
    constructor() {
        super();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async onModuleInit() {
        await this.$connect();
    }
    

}
