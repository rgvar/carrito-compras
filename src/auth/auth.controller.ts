import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(201)
    @Post("register")
    async register(@Body() registerDto: RegisterDto) {

        return this.authService.register(registerDto);

    }

    @HttpCode(200)
    @Post("login")
    async login(@Body() loginDto: LoginDto) {

        return this.authService.login(loginDto);

    }


}
