import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

export const connect = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
};

export const cleanData = async () => {
  const collections = mongoose.connection.collections;

  await mongoose.connection.db.dropDatabase();
};

export const cleanConnections = () => {
  mongo.stop();
  mongoose.disconnect();
};
