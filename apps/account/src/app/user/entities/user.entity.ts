import {
  AbstractUser,
  AbstractUserCourses,
  PurchaseState,
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

  public getUserPublicProfile() {
    return {
      email: this.email,
      role: this.role,
      displayName: this.displayName,
    };
  }

  public addCourse(courseId: string) {
    this.courses = this.courses ?? [];
    const exist = this.courses.find((c) => c.courseId === courseId);
    if (exist) {
      throw new Error('Course already exists');
    }

    this.courses.push({
      courseId,
      purchaseState: PurchaseState.Started,
    });
    return this;
  }

  public deleteCourse(courseId: string) {
    this.courses = this.courses ?? [];
    const idx = this.courses.findIndex((c) => c.courseId === courseId);
    if (idx === -1) {
      throw new Error('Course doesnt exist');
    }

    this.courses = this.courses.splice(idx, 1);
    return this;
  }

  public setCourseStatus(courseId: string, state: PurchaseState) {
    const exist = this.courses.find((c) => c.courseId === courseId);
    if (!exist) {
      this.courses.push({
        courseId,
        purchaseState: PurchaseState.Started,
      });
      return this;
    }
    if (state === PurchaseState.Canceled) {
      this.courses = this.courses.filter((c) => c.courseId !== courseId);
      return this;
    }
    this.courses = this.courses.map((c) => {
      if (c.courseId === courseId) {
        c.purchaseState = state;
      }
      return c;
    });
    return this;
  }
}
