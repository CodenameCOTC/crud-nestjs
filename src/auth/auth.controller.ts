import { Controller, Post, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';
import {LoginSuccess} from './interfaces/login-success.interface'


@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly AuthService: AuthService
    ) { }

    @Post('/login')
    signIn(@Body() userData: SignInDTO): Promise<LoginSuccess> {
        return this.AuthService.signIn(userData);
    }
}
