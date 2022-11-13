import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountChangeProfile } from '@purple/contracts';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async update(user: AccountChangeProfile.Request) {
    const oldUser = await this.userRepository.findUserById(user.id);
    if (!oldUser) {
      throw new BadRequestException('User not found');
    }
    const { displayName } = user;
    const userEntity = new UserEntity(oldUser).updateProfile(displayName);

    return this.userRepository.update(userEntity);
  }
}
