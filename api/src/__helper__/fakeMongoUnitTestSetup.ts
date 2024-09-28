import mongoose from 'mongoose';

beforeAll(async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined');
  }
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
});
