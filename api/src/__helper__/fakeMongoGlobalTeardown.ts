import { MongoMemoryServer } from 'mongodb-memory-server';

export default async function globalTeardown() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
  await instance.stop();
}
