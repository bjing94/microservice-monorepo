import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@purple/contracts';
import JWTAuthGuard from '../guards/auth.guard';
import { UserId } from '../guards/user.decorator';

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(JWTAuthGuard)
  @Get('info')
  async register(
    @Body() dto: AccountRegister.Request,
    @UserId() userId: string
  ) {
    // return this.authSerivce.register(dto);
  }
}
