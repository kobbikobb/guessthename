import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoTestServer: MongoMemoryServer;

export const connect = async () => {
  // NOTE: Close previous before opening a new connection.
  await mongoose.disconnect();
  mongoTestServer = await MongoMemoryServer.create();

  const mongoUri = await mongoTestServer.getUri();

  await mongoose.connect(mongoUri);
};

export const close = async () => {
  await mongoose.disconnect();
  await mongoTestServer.stop();
};

// Remove all data from collections
export const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
