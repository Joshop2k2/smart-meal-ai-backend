import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (!isConnected) {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DATABASE,
    });
    isConnected = true;
    console.log('Connected to MongoDB (via Mongoose)');
  }
};
