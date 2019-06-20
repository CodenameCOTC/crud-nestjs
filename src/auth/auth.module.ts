import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UserModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, AuthService]
})
export class AuthModule { }
