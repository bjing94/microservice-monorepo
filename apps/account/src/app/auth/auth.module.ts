import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import getJwtConfiguration from '../configs/jwt.config';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import AuthService from './auth.service';

@Module({
  imports: [UserModule, JwtModule.registerAsync(getJwtConfiguration())],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
