import { Redis } from 'ioredis';
import { env } from './env';

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 0,
  connectTimeout: 1000,
  commandTimeout: 1000,
  enableReadyCheck: false,
  lazyConnect: true,
  retryStrategy: () => null, // Do not hang or retry indefinitely on connection failure
});

redis.on('connect', () => {
  console.log('✅ Redis client connected.');
});

redis.on('error', (err) => {
  console.warn('⚠️ Redis Connection Alert:', err.message);
});

export const connectRedis = async (): Promise<void> => {
  try {
    await redis.connect();
  } catch (error: any) {
    console.warn(`⚠️ Could not connect to Redis at ${env.REDIS_URL}: ${error.message}. Background jobs will retry on connect.`);
  }
};
