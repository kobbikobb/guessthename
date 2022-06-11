import http from 'http';
import app from './app';
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  const user = process.env.ME_CONFIG_MONGODB_ADMINUSERNAME;
  const pass = process.env.ME_CONFIG_MONGODB_ADMINPASSWORD;
  const serverUrl = process.env.ME_CONFIG_MONGODB_SERVER;
  const serverUri = process.env.MONGODB_SERVER_URI;
  try {
    console.log('Connecting to Mongo!');
    const uri = serverUri || `mongodb://${user}:${pass}@${serverUrl}:27017/api?authSource=admin`;
    console.log('Uri:', uri);
    await mongoose.connect(uri);

    console.log('Connected to Mongo!');
  } catch (error) {
    console.log('Cannot connect to the database!', error);
    process.exit();
  }
};

const startServer = async () => {
  await connectToDatabase();

  const server = http.createServer(app);
  const PORT: any = process.env.PORT ?? 3000;
  server.listen(PORT, () =>
    console.log(`The server is running on port ${PORT}`)
  );
};

startServer();
