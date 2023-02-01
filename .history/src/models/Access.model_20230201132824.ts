import mongoose, { Schema } from 'mongoose';

export interface RateLimiter {
  req_per_hour: number;
}

export interface IAccess {
  access_id: string;
  access_key: string;
  secret: string;
  user_id?: string;
  updatedAt: Date | string | number;
  createdAt: Date | string | number;
}

const AccessSchema: Schema = new Schema(
  {
    access_id: String,
    access_key: { type: String, required: true },
    secret: { type: String, required: true },
    company_id: { type: String, required: true },
    rate_limiter: {
      req_per_hour: Number
    },
    scope: [String],
    ip_whitelist: { type: [String], default: ['*'] },
    valid: Boolean,
    downloaded: Boolean,
    zapier: Boolean,
    testMode: Boolean,
    location: { type: String, default: 'US' },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const GlobalApiAccess = mongoose.model<IAccess>(
  'access',
  AccessSchema,
  'access'
);
