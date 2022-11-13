import {
  AbstractUser,
  AbstractUserCourses,
  UserRole,
} from '@purple/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';
import { Hash } from 'crypto';

export class UserEntity implements AbstractUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses?: AbstractUserCourses[];

  constructor(user: Partial<AbstractUser>) {
    this._id = user._id;
    this.displayName = user.displayName;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.courses = user.courses;

    if (!user.role) {
      this.role = UserRole.Student;
    }
    this.role = user.role;
    return this;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }

  public updateProfile(displayName: string) {
    this.displayName = displayName;
    return this;
  }
}
