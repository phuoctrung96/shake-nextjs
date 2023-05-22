import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { REDIS_KEY_EXPIRY_TIME_SEVEN_DAYS } from '../../../api/redis';
import redis from '../../../lib/redis';
import { MetadataResType } from '../../../types/companies';
import { newApiFetch } from '../../../utils/fetch';

export type CompanyMetadataResponseType = {
  success: boolean;
  organization: CompanyMetadataType;
};

export type CompanyMetadataType = {
  website: string;
  official_name: string;
  ticker_symbol?: string;
  address?: string;
  description?: string;
  industry?: string;
  country_code?: string;
  sub_industry?: string;
  phone_number?: string;
  sector?: string;
  number_of_employees?: number | string;
  founded?: string;
};

const getMetadata = async (slug: string): Promise<AxiosResponse<CompanyMetadataResponseType>> => {
  const result = await newApiFetch.get('internal/companies/metadata', {
    params: { name: slug },
  });

  return result.data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug ?? '';
  const redisKey = `metadata/${slug}`;

  try {
    const metadataRedisRes: string | null = await redis.hget(redisKey, 'response');

    if (!metadataRedisRes) {
      console.log(`Metadata for ${slug} doesn't exist in Redis`);
      // get data from API and save to Redis
      const metadataRes = await getMetadata(slug);

      await redis.hset(redisKey, 'response', JSON.stringify(metadataRes));
      await redis.expire(redisKey, REDIS_KEY_EXPIRY_TIME_SEVEN_DAYS);

      res.status(200).json({ ...metadataRes, slug });
      return;
    }

    console.log(`Metadata for ${slug} exists in Redis`);
    const metadataJson: MetadataResType = await JSON.parse(metadataRedisRes);

    res.status(200).json({ ...metadataJson, slug });
  } catch (error: any) {
    res.status(500).json({ error });
  }
};

export default handler;
