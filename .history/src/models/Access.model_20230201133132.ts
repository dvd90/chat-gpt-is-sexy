import mongoose, { Schema } from 'mongoose';

export interface RateLimiter {
  req_per_hour: number;
}

export interface IAccess {
  access_id: string;
  access_key: string;
  secret: string;
  user_id?: string;
}

const AccessSchema: Schema = new Schema(
  {
    access_id: String,
    access_key: { type: String, required: true },
    secret: { type: String, required: true },
    user_id: String
  },
  { timestamps: true }
);

export const Access = mongoose.model<IAccess>('access', AccessSchema, 'access');
