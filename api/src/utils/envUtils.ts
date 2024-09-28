export const getMongoDbUriFromEnv = () => {
    const mongoDbUri = process.env.MONGO_DB_URI;
    if (mongoDbUri) {
        return mongoDbUri;
    }
    const user = process.env.ME_CONFIG_MONGODB_ADMINUSERNAME ?? '';
    const pass = process.env.ME_CONFIG_MONGODB_ADMINPASSWORD ?? '';
    const mongoServer = process.env.ME_CONFIG_MONGODB_SERVER ?? 'mongo';

    return `mongodb://${user}:${pass}@${mongoServer}:27017/api?authSource=admin`;
};
