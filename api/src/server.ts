import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import { getMongoDbUriFromEnv } from './utils/envUtils';

const connectToDatabase = async (): Promise<void> => {
    try {
        console.log('Connecting to Mongo!');

        mongoose.set('strictQuery', false);
        await mongoose.connect(getMongoDbUriFromEnv());

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

startServer();
