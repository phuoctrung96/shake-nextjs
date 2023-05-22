import redis from '../lib/redis';
import { requestMetadata } from './api';

export const REDIS_KEY_EXPIRY_TIME_SEVEN_DAYS = 60 * 60 * 24 * 7; // 7 days

export const getOrFetchMetadata = async (slug: string) => {
  const redisKey = `metadata/${slug}`;

  const metadataRes = await redis.hget(redisKey, 'response');

  if (!metadataRes) {
    console.log(`metadata for ${slug} doesn't exist in Redis`);

    const metadataResult = await requestMetadata(slug);

    await redis.hset(
      redisKey,
      'response',
      JSON.stringify(metadataResult),
      'updatedOn',
      new Date().toISOString()
    );
    await redis.expire(redisKey, REDIS_KEY_EXPIRY_TIME_SEVEN_DAYS);

    return { ...metadataResult };
  }

  const metadataJson = await JSON.parse(metadataRes);

  console.log(`metadata for ${slug} exists in Redis`);
  return { ...metadataJson, slug };
};
