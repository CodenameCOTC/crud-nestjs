import { Injectable,  HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service'
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SignInDTO } from './dto/signin.dto'
import {LoginSuccess} from './interfaces/login-success.interface'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(userData: SignInDTO): Promise<LoginSuccess> {
        const user = await this.userService.findOneByEmail(userData.email);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        const isMatch = await bcrypt.compare(userData.password, user.password);

        if (!isMatch) {
            throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST)
        }

        const jwtPayload: JwtPayload = {
            id: user.id,
            email: user.email,
        }
        
        const token = this.jwtService.sign(jwtPayload)
        const response: LoginSuccess = {
            status: 'Success',
            token
        }

        return response
    }
    
        
    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.findOneByEmail(payload.email)
    }
}
