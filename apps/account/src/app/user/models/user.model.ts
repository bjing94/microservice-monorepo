import {
  AbstractUser,
  PurchaseState,
  AbstractUserCourses,
  UserRole,
} from '@purple/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class UserCoursesModel extends Document implements AbstractUserCourses {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true, type: String, enum: PurchaseState })
  purchaseState: PurchaseState;
}

export const userCoursesSchema = SchemaFactory.createForClass(UserCoursesModel);

@Schema()
export class UserModel extends Document implements AbstractUser {
  @Prop()
  displayName?: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  passwordHash: string;
  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Student,
  })
  role: UserRole;

  @Prop({ required: false, type: [userCoursesSchema], _id: false })
  courses: Types.Array<UserCoursesModel>;
}

export const userSchema = SchemaFactory.createForClass(UserModel);
