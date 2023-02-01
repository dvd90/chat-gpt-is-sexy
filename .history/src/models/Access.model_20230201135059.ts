import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'crypto';

export interface IAccess {
  access_id: string;
  access_key: string;
  secret: string;
  user_id?: string;
}

const AccessSchema: Schema = new Schema(
  {
    access_id: {
      type: String,
      required: true,
      unique: true,
      default: randomUUID()
    },
    access_key: {
      type: String,
      required: true,
      unique: true,
      default: randomUUID()
    },
    secret: {
      type: String,
      required: true,
      unique: true,
      default: randomUUID()
    },
    user_id: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

export const Access = mongoose.model<IAccess>('access', AccessSchema, 'access');
