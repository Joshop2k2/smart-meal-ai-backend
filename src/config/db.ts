import { config } from '../config';
import mongoose from 'mongoose';

const { dbUrl, dbName } = config.db;
let isConnected = false;

export const connectDB = async () => {
  if (!isConnected) {
    if (!dbUrl) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    await mongoose.connect(dbUrl, {
      dbName: dbName,
    });
    isConnected = true;
    console.log('Connected to MongoDB (via Mongoose)');
  }
};
