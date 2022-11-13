import { Body, Controller } from '@nestjs/common';
import { AccountChangeProfile } from '@purple/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserRepository } from '../repositories/user.repository';
import UserService from '../services/user.service';

// Commands change the state of our data
@Controller()
export default class UserCommandController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService
  ) {}

  @RMQValidate()
  @RMQRoute(AccountChangeProfile.topic)
  async userInfo(
    @Body() dto: AccountChangeProfile.Request
  ): Promise<AccountChangeProfile.Response> {
    const user = await this.userService.update(dto);

    return {};
  }
}
