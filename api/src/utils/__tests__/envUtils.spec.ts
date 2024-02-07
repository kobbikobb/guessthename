import { getMongoDbUriFromEnv } from '../envUtils';

describe('envUtils', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {};
  });

  it('should get mongo db uri from user, pass and server ', () => {
    process.env.ME_CONFIG_MONGODB_ADMINUSERNAME = 'user123';
    process.env.ME_CONFIG_MONGODB_ADMINPASSWORD = 'pass123';
    process.env.ME_CONFIG_MONGODB_SERVER = 'db123';

    const uri = getMongoDbUriFromEnv();

    expect(uri).toEqual(
      'mongodb://user123:pass123@db123:27017/api?authSource=admin'
    );
  });

  it('should get mongo db uri from default ', () => {
    const uri = getMongoDbUriFromEnv();

    expect(uri).toEqual('mongodb://:@mongo:27017/api?authSource=admin');
  });

  it('should get mongo db uri from server only ', () => {
    process.env.ME_CONFIG_MONGODB_SERVER = 'theserver';

    const uri = getMongoDbUriFromEnv();

    expect(uri).toEqual('mongodb://:@theserver:27017/api?authSource=admin');
  });

  it('should get mongo db uri from user only ', () => {
    process.env.ME_CONFIG_MONGODB_ADMINUSERNAME = 'user123';

    const uri = getMongoDbUriFromEnv();

    expect(uri).toEqual('mongodb://user123:@mongo:27017/api?authSource=admin');
  });

  it('should get mongo db uri from pass only ', () => {
    process.env.ME_CONFIG_MONGODB_ADMINPASSWORD = 'pass123';

    const uri = getMongoDbUriFromEnv();

    expect(uri).toEqual('mongodb://:pass123@mongo:27017/api?authSource=admin');
  });

  it('should get mongo db uri from mongo uri ', () => {
    process.env.MONGO_DB_URI = 'directmongopath';

    const uri = getMongoDbUriFromEnv();

    expect(uri).toEqual('directmongopath');
  });
});
