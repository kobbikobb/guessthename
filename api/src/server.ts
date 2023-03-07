import http from 'http';
import app from './app';
import mongoose from 'mongoose';

const connectToDatabase = async (): Promise<void> => {
  const user = process.env.ME_CONFIG_MONGODB_ADMINUSERNAME ?? '';
  const pass = process.env.ME_CONFIG_MONGODB_ADMINPASSWORD ?? '';
  const mongoServer = process.env.ME_CONFIG_MONGODB_SERVER ?? 'mongo';
  const mongoDbUri = process.env.MONGO_DB_URI;

  try {
    console.log('Connecting to Mongo!');
    const uri = `mongodb://${user}:${pass}@${mongoServer}:27017/api?authSource=admin`;
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoDbUri ?? uri);

    console.log('Connected to Mongo!');
  } catch (error) {
    console.log('Cannot connect to the database!', error);
    process.exit();
  }
};

const startServer = async (): Promise<void> => {
  await connectToDatabase();

  const server = http.createServer(app);
  const PORT: string = process.env.PORT ?? '3000';
  server.listen(PORT, (): void => {
    console.log(`The server is running on port ${PORT}`);
  });
};

// eslint-disable-next-line
startServer();
