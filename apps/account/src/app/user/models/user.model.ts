import { AbstractUser, UserRole } from '@purple/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserModel extends Document implements AbstractUser {
  @Prop()
  displayName?: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  passwordHash: string;
  @Prop({ required: true, enum: UserRole, default: UserRole.Student })
  role: UserRole;
}

export const userSchema = SchemaFactory.createForClass(UserModel);
