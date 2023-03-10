import mongoose from 'mongoose';
import { dbUri, logDanger, logPrimary } from '../utils';

export async function initDB(): Promise<mongoose.Connection | undefined> {
  try {
    if (!dbUri) {
      logDanger('DB not connected...');
      return;
    }

    await mongoose.connect(dbUri);

    const db = mongoose.connection;

    logPrimary('Mongodb connected...');

    return db;
  } catch (err) {
    logDanger(err.message);
    // exit process
    process.exit(1);
  }
}
