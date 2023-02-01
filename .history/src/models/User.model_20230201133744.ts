import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'crypto';

export interface IUser {
  user_id: string;
  name: string;
  email: string;
}

const AccessSchema: Schema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
      default: randomUUID()
    },
    access_key: {
      type: String
    },
    secret: {
      type: String,
      required: true,
      unique: true,
      default: randomUUID()
    },
    user_id: String
  },
  { timestamps: true }
);

export const Access = mongoose.model<IAccess>('access', AccessSchema, 'access');
