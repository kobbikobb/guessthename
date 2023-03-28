import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoDb: MongoMemoryServer;

export const connect = async (): Promise<void> => {
  mongoDb = await MongoMemoryServer.create();
  const uri = mongoDb.getUri();
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
};

export const cleanData = async (): Promise<void> => {
  await mongoose.connection.db.dropDatabase();
};

export const disconnect = async (): Promise<void> => {
  await mongoose.disconnect();
  await mongoDb.stop();
};
