import { UserModel } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../entities/user.entity';

export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {}

  create(user: UserEntity) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  update({ _id, ...rest }: UserEntity) {
    return this.userModel.updateOne({ _id }, rest);
  }

  findUser(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  findUserById(id: string) {
    return this.userModel.findOne({ id }).exec();
  }

  async deleteUser(email: string) {
    this.userModel.deleteOne({ email }).exec();
  }
}
