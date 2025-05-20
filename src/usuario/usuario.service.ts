import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto, UpdateUsuarioDto, UsuarioDto } from './dto';


@Injectable()
export class UsuarioService {

    constructor(private readonly prisma: PrismaService) { }

    async createUsuario(createUsuarioDto: CreateUsuarioDto) {

        const newUsuario = await this.prisma.usuario.create({
            data: {
                ...createUsuarioDto
            },
            omit: {
                disponible: true,
                password: true 
            }
        })

        return newUsuario;
    }

    async getAllUsuarios(): Promise<UsuarioDto[]> {

        return await this.prisma.usuario.findMany({
            where: { disponible: true },
            omit: { 
                disponible: true,
                password: true,
            }
        });

    }

    async getUsuarioById(ID: number): Promise<UsuarioDto> {

        const usuario = await this.prisma.usuario.findUnique({
            where: { ID, disponible: true },
            include: { facturas: true },
            omit: { 
                disponible: true,
                password: true,
            }
        });
        if (!usuario) {
            throw new NotFoundException(`Usuario con ID: #${ID} no encontrado. `);
        }

        return usuario;

    }

    async getUsuarioByEmail(email: string): Promise<any> {

        const usuario = await this.prisma.usuario.findUnique({
            where: { email, disponible: true },
            select: {
                ID: true,
                email: true,
                password: true,
            }
        });
        if (!usuario) {
            throw new NotFoundException(`Usuario con email: '${email}' no encontrado. `);
        }
        return usuario;
    }

    async updateUsuario(ID: number, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioDto> {
        
        const usuario = await this.prisma.usuario.findUnique({
            where: { ID, disponible: true },
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario con ID: #${ID} no encontrado. `);
        }

        const updatedUsuario = await this.prisma.usuario.update({
            where: { ID },
            data: {
                ...updateUsuarioDto
            },
            omit: {
                disponible: true,
                password: true
            }

        })

        return updatedUsuario;

    }

    async removeUsuario(ID: number) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { ID, disponible: true }
        });
        if (!usuario) {
            throw new NotFoundException(`Usuario con ID: #${ID} no encontrado. `);
        }

        await this.prisma.usuario.update({
            where: { ID },
            data: {
                disponible: false
            }
        });

    }
}
