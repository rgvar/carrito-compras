import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService
    ) { }

    async register(registerData: RegisterDto) {

        const { email, password, ...data } = registerData;

        const hashedPassword = await bcryptjs.hash(password, 10);

        await this.usuarioService.createUsuario({ 
            ...data, 
            email, 
            password: hashedPassword 
        });

        return { message: `Usuario ${email} creado correctamente. ` };

    }

    async login(login: LoginDto) {

        const user = await this.usuarioService.getUsuarioByEmail(login.email);

        const validation = await bcryptjs.compare(login.password, user.password);

        if (!validation) {
            throw new UnauthorizedException("Las contraseñas no coinciden. ");
        }

        const payload = { sub: user.ID, email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload)
        };


    }


}
