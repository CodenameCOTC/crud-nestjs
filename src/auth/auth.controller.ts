import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';
import { LoginSuccess } from './interfaces/login-success.interface'
import { ValidateUserPipe } from '../user/pipe/validate-user.pipe'


@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly AuthService: AuthService
    ) { }

    @Post('/login')
    @UsePipes(new ValidateUserPipe())
    signIn(@Body() userData: SignInDTO): Promise<LoginSuccess> {
        return this.AuthService.signIn(userData);
    }
}
