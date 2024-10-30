import mongoose from 'mongoose';
import { MONGO_DB_NAME, MONGO_URI } from '../config';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}/${MONGO_DB_NAME}`, {
      writeConcern: {
        w: 'majority',
      },
    });

    console.log('MongoDB connected 🥳');
  } catch (error) {
    console.error('🥺 MongoDB connection error:', error);
    process.exit(1);
  }
};
