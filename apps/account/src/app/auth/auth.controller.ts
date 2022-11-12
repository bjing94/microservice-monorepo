import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import AuthService from './auth.service';
import { AccountLogin, AccountRegister } from '@purple/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerivce: AuthService) {}

  @RMQRoute(AccountRegister.topic)
  @RMQValidate()
  async register(
    @Body() dto: AccountRegister.Request
  ): Promise<AccountRegister.Response> {
    console.log('Registering user', dto);
    return this.authSerivce.register(dto);
  }

  @RMQRoute(AccountLogin.topic)
  @RMQValidate()
  async login(
    @Body() { email, password }: AccountLogin.Request
  ): Promise<AccountLogin.Response> {
    const { id } = await this.authSerivce.validateUser(email, password);
    return this.authSerivce.login(id);
  }
}
