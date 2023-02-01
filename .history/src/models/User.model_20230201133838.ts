import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'crypto';

export interface IUser {
  user_id: string;
  name: string;
  email: string;
}

const UserSchema: Schema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
      default: randomUUID()
    },
    name: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('users', UserSchema, 'users');
