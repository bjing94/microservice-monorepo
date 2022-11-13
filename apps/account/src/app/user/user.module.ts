import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserCommandController from './controllers/user.command.controller';
import UserQueryController from './controllers/user.query.controller';
import { UserModel, userSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import UserService from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: userSchema }]),
  ],
  controllers: [UserCommandController, UserQueryController],
  providers: [UserRepository, UserService],
  exports: [UserRepository],
})
export class UserModule {}
