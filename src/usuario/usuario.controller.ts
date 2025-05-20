import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, HttpCode } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateUsuarioDto, UsuarioDto, UpdateUsuarioDto } from './dto';

@UseGuards(AuthGuard)
@ApiBearerAuth('jwt-auth')
@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @HttpCode(201)
    @Post()
    async createUsuario(@Body() createUsuarioDto: CreateUsuarioDto): Promise<UsuarioDto> {
        return await this.usuarioService.createUsuario(createUsuarioDto);
    }

    @HttpCode(200)
    @Get()
    async getAllUsuarios(): Promise<UsuarioDto[]> {
        return await this.usuarioService.getAllUsuarios();
    }

    @HttpCode(200)
    @Get(':id')
    async getUsuarioById(@Param('id') id: number): Promise<UsuarioDto> {
        return await this.usuarioService.getUsuarioById(id);
    }

    @HttpCode(200)
    @Put(':id')
    async updateUsuario(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) : Promise<UsuarioDto> {
        return await this.usuarioService.updateUsuario(id, updateUsuarioDto);
    }

    @HttpCode(204)
    @Delete(':id')
    async removeUsuario(@Param('id') id: number) {
        await this.usuarioService.removeUsuario(id);
    }
}
