import { Controller, Post, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';


@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly AuthService: AuthService
    ) { }

    @Post('/login')
    signIn(@Body() userData: SignInDTO): Promise<string> {
        return this.AuthService.signIn(userData);
    }
}
