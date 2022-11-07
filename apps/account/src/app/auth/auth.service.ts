import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRole } from '@purple/interfaces';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repository';
import { RegisterDto } from './auth.controller';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register({ email, password, displayName }: RegisterDto) {
    const oldUser = await this.userRepository.findUser(email);
    if (oldUser) {
      throw new BadRequestException('User already exists');
    }

    const newUserEntity = await new UserEntity({
      displayName,
      email,
      role: UserRole.Student,
    }).setPassword(password);

    const newUser = await this.userRepository.create(newUserEntity);
    return { email: newUser.email };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new BadRequestException('User doesnt exist');
    }
    const userEntity = new UserEntity(user);

    const passwordCorrect = await userEntity.validatePassword(password);
    if (!passwordCorrect) {
      throw new BadRequestException('User doesnt exist');
    }
    return { id: user._id };
  }

  async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }
}
