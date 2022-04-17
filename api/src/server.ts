import http from 'http';
import app from './app';
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    console.log('Connecting to Mongo!!!');
    await mongoose.connect('mongodb://mongo:27017/api');
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
